import { EmbeddingsProvider } from "@enconvo/api";
import { Ollama } from "ollama";

export default function main(options: any) {

    return new OllamaEmbeddingsProvider({ options })

}


class OllamaEmbeddingsProvider extends EmbeddingsProvider {
    _ollama: Ollama;
    constructor(params: { options: EmbeddingsProvider.EmbeddingsOptions }) {
        super(params);
        const credentials = this.options.credentials;

        const customHeaders: Record<string, string> = {};
        if (credentials?.customHeaders) {
            const headerString = credentials.customHeaders as string;
            const headerPairs = headerString
                .split("\n")
                .filter((line) => line.trim() && line.trim().includes("="));
            for (const pair of headerPairs) {
                const [key, value] = pair.split("=");
                if (key && value) {
                    customHeaders[key.trim()] = value.trim();
                }
            }
        }

        this._ollama = new Ollama({
            host: credentials?.baseUrl,
            headers: {
                ...customHeaders,
                Authorization: `Bearer ${credentials?.apiKey || ""}`,
                "User-Agent": "Enconvo/1.0",
            },
        });
    }


    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        const response = await this._ollama.embed({
            model: this.options.modelName.value,
            input: input,
        });
        return response.embeddings;
    }

}
