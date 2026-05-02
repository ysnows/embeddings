---
name: embeddings
description: >
  Embedding provider integrations for OpenAI, Voyage AI, Ollama, SiliconFlow, and Enconvo Cloud Plan, with model management APIs.
metadata:
  author: EnconvoAI
  version: "1.0.12"
---

## API Reference

Just use the `local_api` tool to request these APIs.

| Endpoint | Description |
|----------|-------------|
| `embeddings/embed` | Generate embeddings for one or more input strings using the configured embeddings provider. Returns an OpenAI-compatible response: `{ object: "list", data: [{ object, index, embedding }], model, usage }`.. _No params_ |
| `embeddings/models/enconvo_ai` | _No params_ |
| `embeddings/models/ollama` | _No params_ |
| `embeddings/models/open_ai` | _No params_ |
| `embeddings/models/siliconflow` | _No params_ |
| `embeddings/models/voyage` | _No params_ |

