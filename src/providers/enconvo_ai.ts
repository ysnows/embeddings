import { env } from 'process';
import { EmbeddingsProvider } from '@enconvo/api';
import axios from 'axios';

interface EmbeddingsResponse {
    object: 'list';
    data: { object: 'embedding'; index: number; embedding: number[] }[];
    model: string;
    usage: { prompt_tokens: number; total_tokens: number };
}

export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {
    return new EnConvoEmbeddingsProvider({ options })
}

export class EnConvoEmbeddingsProvider extends EmbeddingsProvider {
    private baseURL: string
    private headers: Record<string, string>

    constructor(options: any) {
        super(options)
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer enconvo",
            "accessToken": `${env['accessToken']}`,
            "client_id": `${env['client_id']}`,
            "commandKey": `${env['commandKey']}`,
        }
        this.baseURL = "https://api.enconvo.com/v1"
        // this.baseURL = "http://127.0.0.1:8181/v1"
    }

    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        try {
            const { data } = await axios.post<EmbeddingsResponse>(
                `${this.baseURL}/embeddings`,
                {
                    model: this.options.modelName.value,
                    input,
                },
                { headers: this.headers }
            )
            return data.data.map((item) => item.embedding)
        } catch (error: any) {
            console.error("enconvo ai embeddings error", error?.response?.data ?? error)
            throw error
        }
    }
}
