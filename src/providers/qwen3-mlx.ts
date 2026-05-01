import { EmbeddingsProvider, NativeAPI } from "@enconvo/api";

const DEFAULT_MODEL = "mlx-community/Qwen3-Embedding-0.6B-4bit-DWQ";

export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {
  return new Qwen3EmbeddingsProvider({ options });
}

export class Qwen3EmbeddingsProvider extends EmbeddingsProvider {
  constructor(params: { options: EmbeddingsProvider.EmbeddingsOptions }) {
    super(params);
  }

  async preload(): Promise<void> {
    const opts = this.options as EmbeddingsProvider.EmbeddingsOptions & {
      modelName?: { value: string };
    };
    const modelId = opts.modelName?.value || DEFAULT_MODEL;
    await NativeAPI.localApi("mlx_manage/model/load", {
      model_id: modelId,
      category: "embedding",
    }).catch(() => undefined);
  }

  protected async _embed(
    input: string[],
    _?: EmbeddingsProvider.EmbeddingsOptions
  ): Promise<number[][]> {
    const opts = this.options as EmbeddingsProvider.EmbeddingsOptions & {
      modelName?: { value: string };
    };
    const modelId = opts.modelName?.value || DEFAULT_MODEL;

    const resp = await NativeAPI.localApi("mlx_manage/mlx_embeddings/embed", {
      hf_model_id: modelId,
      text: input,
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.statusText);
      throw new Error(
        `MLX Qwen3 embeddings request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      embeddings?: number[][];
    };
    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error(
        "MLX Qwen3 embeddings: malformed response — missing 'embeddings' array"
      );
    }
    return data.embeddings;
  }
}
