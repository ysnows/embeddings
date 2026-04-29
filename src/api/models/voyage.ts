export const embeddingsVoyageModels = [
  {
    "title": "voyage-4-large",
    "value": "voyage-4-large",
    "id": "voyage-4-large",
    "description": "Voyage 4 Large — high-quality embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-4",
    "value": "voyage-4",
    "id": "voyage-4",
    "description": "Voyage 4 — balanced embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-4-lite",
    "value": "voyage-4-lite",
    "id": "voyage-4-lite",
    "description": "Voyage 4 Lite — lightweight embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-3-large",
    "value": "voyage-3-large",
    "id": "voyage-3-large",
    "description": "Voyage 3 Large — high-quality embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-3.5",
    "value": "voyage-3.5",
    "id": "voyage-3.5",
    "description": "Voyage 3.5 — general-purpose embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-3.5-lite",
    "value": "voyage-3.5-lite",
    "id": "voyage-3.5-lite",
    "description": "Voyage 3.5 Lite — lightweight embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-code-3",
    "value": "voyage-code-3",
    "id": "voyage-code-3",
    "description": "Voyage Code 3 — code-specialized embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-3",
    "value": "voyage-3",
    "id": "voyage-3",
    "description": "Voyage 3 — general-purpose embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-3-lite",
    "value": "voyage-3-lite",
    "id": "voyage-3-lite",
    "description": "Voyage 3 Lite — lightweight embeddings with your own API key.",
    "dimension": 512,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-finance-2",
    "value": "voyage-finance-2",
    "id": "voyage-finance-2",
    "description": "Voyage Finance 2 — finance-specialized embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-multilingual-2",
    "value": "voyage-multilingual-2",
    "id": "voyage-multilingual-2",
    "description": "Voyage Multilingual 2 — multilingual embeddings with your own API key.",
    "dimension": 1024,
    "context": 32000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-law-2",
    "value": "voyage-law-2",
    "id": "voyage-law-2",
    "description": "Voyage Law 2 — legal-specialized embeddings with your own API key.",
    "dimension": 1024,
    "context": 16000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  },
  {
    "title": "voyage-code-2",
    "value": "voyage-code-2",
    "id": "voyage-code-2",
    "description": "Voyage Code 2 — code-specialized embeddings with your own API key.",
    "dimension": 1536,
    "context": 16000,
    "is_online": true,
    "is_enconvo_cloud": false,
    "is_bring_your_own_key": true
  }
];

export default async function main() {
  return Response.json(embeddingsVoyageModels);
}
