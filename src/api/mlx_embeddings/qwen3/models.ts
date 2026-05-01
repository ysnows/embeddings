import { ListCache, RequestOptions } from "@enconvo/api";

export const qwen3EmbeddingModels = [
  {
    title: "Qwen3-Embedding 0.6B (4bit DWQ)",
    value: "mlx-community/Qwen3-Embedding-0.6B-4bit-DWQ",
    id: "mlx-qwen3-embedding-0.6b-4bit-dwq",
    description:
      "Alibaba Qwen3-Embedding 0.6B (4bit DWQ) — smallest footprint, multilingual. Default.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 1024,
    context: 32768,
    download_size: "335 MB",
  },
  {
    title: "Qwen3-Embedding 4B (4bit DWQ)",
    value: "mlx-community/Qwen3-Embedding-4B-4bit-DWQ",
    id: "mlx-qwen3-embedding-4b-4bit-dwq",
    description:
      "Alibaba Qwen3-Embedding 4B (4bit DWQ) — high-quality multilingual embeddings.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 2560,
    context: 32768,
    download_size: "2.1 GB",
  },
  {
    title: "Qwen3-Embedding 0.6B (mxfp8)",
    value: "mlx-community/Qwen3-Embedding-0.6B-mxfp8",
    id: "mlx-qwen3-embedding-0.6b-mxfp8",
    description:
      "Alibaba Qwen3-Embedding 0.6B (mxfp8) — small, fast, multilingual; high-precision FP8 weights.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 1024,
    context: 32768,
    download_size: "600 MB",
  },
  {
    title: "Qwen3-Embedding 8B (4bit DWQ)",
    value: "mlx-community/Qwen3-Embedding-8B-4bit-DWQ",
    id: "mlx-qwen3-embedding-8b-4bit-dwq",
    description:
      "Alibaba Qwen3-Embedding 8B (4bit DWQ) — top-tier multilingual embeddings.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 4096,
    context: 32768,
    download_size: "4.0 GB",
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return qwen3EmbeddingModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
