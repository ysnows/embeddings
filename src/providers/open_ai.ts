import { EmbeddingsProvider } from "@enconvo/api";

import OpenAI from "openai";

export default function main(options: any) {

    return new OpenAIEmbeddingsProvider({ options })

}


class OpenAIEmbeddingsProvider extends EmbeddingsProvider {
    openai: OpenAI
    constructor(options: any) {
        super(options)
        const credentials = this.options.credentials
        const baseUrl = credentials.baseUrl.endsWith('/') ? credentials.baseUrl : `${credentials.baseUrl}/`;
        this.openai = new OpenAI({
            baseURL: baseUrl,
            apiKey: credentials.apiKey
        })
    }
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {

        try {

            const response = await this.openai.embeddings.create({
                model: this.options.modelName.value,
                input: input,
                encoding_format: "float",
            });

            return response.data.map((item: OpenAI.Embeddings.Embedding) => item.embedding);
        } catch (error) {
            console.error("openai error", error)
            throw error
        }
    }

}
