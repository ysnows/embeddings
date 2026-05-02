import { EmbeddingsProvider, NativeAPI } from "@enconvo/api";

const DEFAULT_MODEL = "mlx-community/embeddinggemma-300m-4bit";
const CLOUD_FALLBACK_MODEL = "cloudflare/@cf/google/embeddinggemma-300m";
const IS_APPLE_SILICON = process.platform === "darwin" && process.arch === "arm64";

async function embedViaCloud(input: string[]): Promise<number[][]> {
  const cloud = await EmbeddingsProvider.create("enconvo_ai", {
    modelName: CLOUD_FALLBACK_MODEL,
  });
  return cloud.embed(input);
}

export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {
  return new EmbeddingGemmaProvider({ options });
}

export class EmbeddingGemmaProvider extends EmbeddingsProvider {
  constructor(params: { options: EmbeddingsProvider.EmbeddingsOptions }) {
    super(params);
  }

  async preload(): Promise<void> {
    if (!IS_APPLE_SILICON) return;
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
    console.log('IS_APPLE_SILICON',IS_APPLE_SILICON)
    if (!IS_APPLE_SILICON) return embedViaCloud(input);

    const opts = this.options as EmbeddingsProvider.EmbeddingsOptions & {
      modelName?: { value: string };
    };
    const modelId = opts.modelName?.value || DEFAULT_MODEL;

    const resp = await NativeAPI.localApi("mlx_manage/mlx_embeddings/embed", {
      hf_model_id: modelId,
      text: input,
      // Don't block the request thread on the ~30s cold-start model load.
      // If the model isn't ready, the server returns {status} immediately
      // and we fall back to the cloud provider below.
      wait_for_load: false,
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

    console.log('mlx load status', data.status)

    // Local model isn't ready — the Python side has kicked off a load (or
    // one was already in progress). Fall back to the cloud provider so the
    // caller still gets embeddings without blocking on the load.
    if (data.status === "loading" || data.status === "unloaded") {
      return embedViaCloud(input);
    }

    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error(
        "MLX EmbeddingGemma: malformed response — missing 'embeddings' array"
      );
    }
    return data.embeddings;
  }
}
