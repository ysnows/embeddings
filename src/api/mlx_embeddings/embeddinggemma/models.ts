import { ListCache, RequestOptions } from "@enconvo/api";

export const embeddingGemmaModels = [
  {
    title: "EmbeddingGemma 300M (4bit)",
    value: "mlx-community/embeddinggemma-300m-4bit",
    id: "mlx-embeddinggemma-300m-4bit",
    description:
      "Google EmbeddingGemma 300M (4bit) — compact multilingual embedding model, fastest local inference.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 768,
    context: 2048,
  },
  {
    title: "EmbeddingGemma 300M (8bit)",
    value: "mlx-community/embeddinggemma-300m-8bit",
    id: "mlx-embeddinggemma-300m-8bit",
    description:
      "Google EmbeddingGemma 300M (8bit) — compact multilingual embedding model, balanced quality/speed.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 768,
    context: 2048,
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return embeddingGemmaModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
