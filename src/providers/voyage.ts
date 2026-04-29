import { EmbeddingsProvider } from "@enconvo/api";
import OpenAI from "openai";
export default function main(options: any) {

    return new VoyageEmbeddingsProvider({ options })

}


class VoyageEmbeddingsProvider extends EmbeddingsProvider {
    openai: OpenAI
    constructor(options: any) {
        super(options)
        const credentials = this.options.credentials
        this.openai = new OpenAI({
            baseURL: "https://api.voyageai.com/v1",
            apiKey: credentials.apiKey
        })
    }


    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {

        try {

            const response = await this.openai.embeddings.create({
                model: this.options.modelName.value,
                input: input,
            });

            return response.data.map((item: OpenAI.Embeddings.Embedding) => item.embedding);
        } catch (error) {
            console.error("openai error", error)
            throw error
        }
    }
}
