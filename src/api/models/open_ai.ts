export const embeddingsOpenAiModels = [
  {
    "title": "text-embedding-ada-002",
    "value": "text-embedding-ada-002",
    "id": "openai-text-embedding-ada-002",
    "description": "OpenAI Text Embedding Ada 002 — legacy embeddings with your own API key.",
    "dimension": 1536,
    "context": 8191,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "text-embedding-3-small",
    "value": "text-embedding-3-small",
    "id": "openai-text-embedding-3-small",
    "description": "OpenAI Text Embedding 3 Small — cost-effective embeddings with your own API key.",
    "dimension": 1536,
    "context": 8191,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "text-embedding-3-large",
    "value": "text-embedding-3-large",
    "id": "openai-text-embedding-3-large",
    "description": "OpenAI Text Embedding 3 Large — high-dimensional embeddings with your own API key.",
    "dimension": 3072,
    "context": 8191,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  }
];

export default async function main() {
  return Response.json(embeddingsOpenAiModels);
}
