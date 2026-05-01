import { EmbeddingsProvider } from "@enconvo/api"

/**
 * Preload the configured embeddings provider on app startup.
 * @private
 */
export default async function main() {
    EmbeddingsProvider.fromEnv().then((provider) => {
        provider.preload()
    })
}
