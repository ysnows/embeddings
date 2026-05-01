import { ListCache, RequestOptions } from "@enconvo/api";

export const jinaEmbeddingsModels = [
  {
    title: "Jina Embeddings v5 Text Small",
    value: "jinaai/jina-embeddings-v5-text-small-mlx",
    id: "jina-embeddings-v5-text-small-mlx",
    description:
      "Jina Embeddings v5 Text Small — high-quality multilingual text embedding model, balanced quality/speed on Apple Silicon.",
    is_online: false,
    is_enconvo_cloud: false,
    is_bring_your_own_key: false,
    supports_streaming: false,
    dimension: 1024,
    context: 8192,
    download_size: "1.3 GB",
  },
];

async function fetchModels(
  _options: RequestOptions
): Promise<ListCache.ListItem[]> {
  return jinaEmbeddingsModels as any;
}

export default async function main(req: Request) {
  const options = (await req.json().catch(() => ({}))) as RequestOptions;

  const modelCache = new ListCache(fetchModels);
  const items = await modelCache.getList(options);

  return Response.json(items);
}
