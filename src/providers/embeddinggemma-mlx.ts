import { EmbeddingsProvider, NativeAPI } from "@enconvo/api";

const DEFAULT_MODEL = "mlx-community/embeddinggemma-300m-4bit";

export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {
  return new EmbeddingGemmaProvider({ options });
}

export class EmbeddingGemmaProvider extends EmbeddingsProvider {
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
        `MLX EmbeddingGemma request failed (${resp.status}): ${errText}`
      );
    }

    const data = (await resp.json()) as {
      embeddings?: number[][];
      status?: "loading" | "unloaded";
    };

    // Local model isn't ready — the Python side has kicked off a load (or
    // one was already in progress). Fall back to the cloud provider so the
    // caller still gets embeddings without blocking on the load.
    if (data.status === "loading" || data.status === "unloaded") {
      const cloud = await EmbeddingsProvider.create("enconvo_ai");
      return cloud.embed(input);
    }

    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error(
        "MLX EmbeddingGemma: malformed response — missing 'embeddings' array"
      );
    }
    return data.embeddings;
  }
}
