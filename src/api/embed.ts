import { DocumentLoaderProvider, EmbeddingsProvider } from "@enconvo/api"
import * as fs from "node:fs"
import * as path from "node:path"
import * as os from "node:os"
import { createHash } from "node:crypto"

/** Embedding request parameters (OpenAI-compatible shape) */
interface EmbedRequest {
  /** @required Input text to embed — a single string or an array of strings for batch embedding */
  input: string | string[]
}

const PDF_PATH = "/Users/ysnows/Documents/tuturial/books/cognitive/Elon Musk - Walter Isaacson.pdf"
const CACHE_DIR = path.join(os.tmpdir(), "enconvo-embed-cache")

type LoaderResult = Awaited<ReturnType<DocumentLoaderProvider["load"]>>

async function loadPdfCached(pdfPath: string): Promise<LoaderResult> {
  const stat = fs.statSync(pdfPath)
  const cacheKey = createHash("md5")
    .update(`${pdfPath}|${stat.size}|${stat.mtimeMs}`)
    .digest("hex")
  const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`)

  if (fs.existsSync(cacheFile)) {
    console.log(`cache hit: ${cacheFile}`)
    return JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
  }

  console.log(`cache miss — loading PDF`)
  console.time("load pdf")
  const documentLoaderProvider = await DocumentLoaderProvider.fromEnv()
  const result = await documentLoaderProvider.load({
    type: "document_url",
    url: `file://${pdfPath}`,
  })
  console.timeEnd("load pdf")

  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(cacheFile, JSON.stringify(result))
  console.log(`cached → ${cacheFile}`)
  return result
}

/**
 * Generate embeddings for one or more input strings using the configured embeddings provider.
 * Returns an OpenAI-compatible response: `{ object: "list", data: [{ object, index, embedding }], model, usage }`.
 * @param {Request} request - Request object, body is {@link EmbedRequest}
 * @returns OpenAI-style embeddings response with prompt/total token estimates (rough length-based heuristic)
 */
export default async function main(_req: Request) {
  console.log(`loading PDF: ${PDF_PATH}`)
  const result = await loadPdfCached(PDF_PATH)
  console.log(`loaded ${result.pages.length} pages`)

  const inputs = result.pages.map((page) => page.content || "")
  const totalChars = inputs.reduce((n, s) => n + s.length, 0)
  console.log(
    `${inputs.length} page inputs (${totalChars} chars total)`,
  )

  const provider = await EmbeddingsProvider.fromEnv()

  const batchSize = 10
  const embeddings: number[][] = []
  console.time("embed total")
  const t0 = Date.now()
  for (let i = 0; i < inputs.length; i += batchSize) {
    const batch = inputs.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1
    const totalBatches = Math.ceil(inputs.length / batchSize)
    const label = `embed batch ${batchNum}/${totalBatches} (${batch.length} pages)`
    console.time(label)
    const vecs = await provider.embed(batch)
    embeddings.push(...vecs)
    console.timeEnd(label)

    if (i + batchSize < inputs.length) {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
  const elapsedMs = Date.now() - t0
  console.timeEnd("embed total")

  const perPageMs = elapsedMs / Math.max(1, inputs.length)
  const charsPerSec = totalChars / (elapsedMs / 1000)
  console.log(
    `embed analysis: ${inputs.length} pages, ${elapsedMs}ms total, ${perPageMs.toFixed(2)}ms/page, ${charsPerSec.toFixed(0)} chars/sec`,
  )

  const resolvedModel = provider.getOptions().modelName?.value ?? ""
  const promptTokens = inputs.reduce((n, s) => n + Math.ceil(s.length / 4), 0)

  return {
    object: "list",
    data: embeddings.map((embedding, index) => ({
      object: "embedding",
      index,
      embedding,
    })),
    model: resolvedModel,
    usage: {
      prompt_tokens: promptTokens,
      total_tokens: promptTokens,
    },
    analysis: {
      pdf_path: PDF_PATH,
      pages: inputs.length,
      total_chars: totalChars,
      embed_ms: elapsedMs,
      ms_per_page: Number(perPageMs.toFixed(2)),
      chars_per_sec: Math.round(charsPerSec),
    },
  }
}
