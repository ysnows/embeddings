import { EmbeddingsProvider } from "@enconvo/api";

const MLX_BASE_URL = "http://127.0.0.1:54535/mlx_manage/mlx_embeddings";
const DEFAULT_MODEL = "mlx-community/embeddinggemma-300m-4bit";

export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {
  return new EmbeddingGemmaProvider({ options });
}

export class EmbeddingGemmaProvider extends EmbeddingsProvider {
  constructor(params: { options: EmbeddingsProvider.EmbeddingsOptions }) {
    super(params);
  }

  protected async _embed(
    input: string[],
    _?: EmbeddingsProvider.EmbeddingsOptions
  ): Promise<number[][]> {
    const opts = this.options as EmbeddingsProvider.EmbeddingsOptions & {
      modelName?: { value: string };
    };
    const modelId = opts.modelName?.value || DEFAULT_MODEL;

    const resp = await fetch(`${MLX_BASE_URL}/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hf_model_id: modelId,
        text: input,
        normalize: true,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.statusText);
      throw new Error(
        `MLX EmbeddingGemma request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as { embeddings?: number[][] };
    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error(
        "MLX EmbeddingGemma: malformed response — missing 'embeddings' array"
      );
    }
    return data.embeddings;
  }
}
