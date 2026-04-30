import { EmbeddingsProvider } from "@enconvo/api";

const OMLX_BASE_URL = "http://127.0.0.1:54536";
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

    const resp = await fetch(`${OMLX_BASE_URL}/v1/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelId,
        input,
        encoding_format: "float",
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.statusText);
      throw new Error(
        `MLX EmbeddingGemma request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      data?: { index: number; embedding: number[] }[];
    };
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error(
        "MLX EmbeddingGemma: malformed response — missing 'data' array"
      );
    }
    return data.data
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((item) => item.embedding);
  }
}
