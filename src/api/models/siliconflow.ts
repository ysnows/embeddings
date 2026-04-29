export const embeddingsSiliconflowModels = [
  {
    "title": "BAAI/bge-m3",
    "value": "BAAI/bge-m3",
    "id": "siliconflow-bge-m3",
    "description": "BGE-M3 — multilingual embeddings via SiliconFlow.",
    "dimension": 1024,
    "context": 8000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "netease-youdao/bce-embedding-base_v1",
    "value": "netease-youdao/bce-embedding-base_v1",
    "id": "siliconflow-bce-embedding-base",
    "description": "BCE Embedding Base — Chinese-English embeddings via SiliconFlow.",
    "dimension": 768,
    "context": 512,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "BAAI/bge-large-en-v1.5",
    "value": "BAAI/bge-large-en-v1.5",
    "id": "siliconflow-bge-large-en",
    "description": "BGE Large EN — English-optimized embeddings via SiliconFlow.",
    "dimension": 1024,
    "context": 512,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "BAAI/bge-large-zh-v1.5",
    "value": "BAAI/bge-large-zh-v1.5",
    "id": "siliconflow-bge-large-zh",
    "description": "BGE Large ZH — Chinese-optimized embeddings via SiliconFlow.",
    "dimension": 1024,
    "context": 512,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  }
];

export default async function main() {
  return Response.json(embeddingsSiliconflowModels);
}
