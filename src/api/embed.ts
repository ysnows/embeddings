import { EmbeddingsProvider } from "@enconvo/api"

export default async function main(req: Request) {
  const params = await req.json()
  const { input_text } = params

  const provider = await EmbeddingsProvider.fromEnv()
  console.log('provider', provider.getOptions())

  const embeddings = await provider.embed([input_text])

  return { embeddings }
}
