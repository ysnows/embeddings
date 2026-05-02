import { ListCache, RequestOptions } from "@enconvo/api";

export const minilmEmbeddingsModels = [
  {
    title: "all-MiniLM-L6-v2 (4bit)",
    value: "mlx-community/all-MiniLM-L6-v2-4bit",
    id: "mlx-all-minilm-l6-v2-4bit",
    description:
      "Sentence-Transformers all-MiniLM-L6-v2 (4bit MLX) — tiny, fast English text embeddings on Apple Silicon.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 384,
    context: 512,
    download_size: "30 MB",
  },
  {
    title: "all-MiniLM-L6-v2 (bf16)",
    value: "mlx-community/all-MiniLM-L6-v2-bf16",
    id: "mlx-all-minilm-l6-v2-bf16",
    description:
      "Sentence-Transformers all-MiniLM-L6-v2 (bf16 MLX) — full-precision English text embeddings on Apple Silicon; higher quality than the 4bit variant at a larger footprint.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 384,
    context: 512,
    download_size: "45 MB",
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return minilmEmbeddingsModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
