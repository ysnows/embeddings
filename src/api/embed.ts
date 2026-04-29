import { EmbeddingsProvider } from "@enconvo/api"

/** Embedding request parameters (OpenAI-compatible shape) */
interface EmbedRequest {
  /** @required Input text to embed — a single string or an array of strings for batch embedding */
  input: string | string[]
  /** Model name echoed back in the response. The active embedding model is determined by the configured provider. */
  model?: string
}

/**
 * Generate embeddings for one or more input strings using the configured embeddings provider.
 * Returns an OpenAI-compatible response: `{ object: "list", data: [{ object, index, embedding }], model, usage }`.
 * @param {Request} request - Request object, body is {@link EmbedRequest}
 * @returns OpenAI-style embeddings response with prompt/total token estimates (rough length-based heuristic)
 */
export default async function main(req: Request) {
  const { input, model } = (await req.json()) as EmbedRequest

  console.log('input', input, model)
  const inputs = Array.isArray(input) ? input : [input]

  const provider = await EmbeddingsProvider.fromEnv()
  const embeddings = await provider.embed(inputs)

  const resolvedModel = model ?? provider.getOptions().modelName?.value ?? ""
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
  }
}
