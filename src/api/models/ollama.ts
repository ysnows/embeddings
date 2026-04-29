import { ListCache, RequestOptions } from "@enconvo/api";
import { Ollama } from "ollama";

const embeddingModels = [
    {
        title: "embeddinggemma",
        value: "embeddinggemma",
        context: 2000,
        dimension: 768,
    },
    {
        title: "embeddinggemma:latest",
        value: "embeddinggemma:latest",
        context: 2000,
        dimension: 768,
    },
    {
        title: "embeddinggemma:300m",
        value: "embeddinggemma:300m",
        context: 2000,
        dimension: 768,
    },
    {
        title: "nomic-embed-text",
        value: "nomic-embed-text",
        context: 2000
    },
    {
        title: "nomic-embed-text:latest",
        value: "nomic-embed-text:latest",
        context: 2000
    },
    {
        title: "nomic-embed-text:v1.5",
        value: "nomic-embed-text:v1.5",
        context: 2000
    },
    {
        title: "mxbai-embed-large",
        value: "mxbai-embed-large",
        context: 512,
        dimension: 1024,
    },
    {
        title: "mxbai-embed-large:latest",
        value: "mxbai-embed-large:latest",
        context: 512,
        dimension: 1024,
    },
    {
        title: "snowflake-arctic-embed",
        value: "snowflake-arctic-embed",
        context: 512,
        dimension: 1024,
    },
    {
        title: "snowflake-arctic-embed:335m",
        value: "snowflake-arctic-embed:335m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:137m",
        value: "snowflake-arctic-embed:137m",
        context: 8192,
    },
    {
        title: "snowflake-arctic-embed:110m",
        value: "snowflake-arctic-embed:110m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:33m",
        value: "snowflake-arctic-embed:33m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:22m",
        value: "snowflake-arctic-embed:22m",
        context: 512,
    },
    {
        title: "all-minilm",
        value: "all-minilm",
        context: 512
    },
    {
        title: "all-minilm:latest",
        value: "all-minilm:latest",
        context: 512
    },
    {
        title: "embedding:22m",
        value: "embedding:22m",
        context: 256,
        dimension: 384,
    },
    {
        title: "embedding:33m",
        value: "embedding:33m",
        context: 256,
        dimension: 384,
    },
    {
        title: "bge-m3",
        value: "bge-m3",
        context: 8192,
        dimension: 1024,
    },
    {
        title: "bge-m3:latest",
        value: "bge-m3:latest",
        context: 8192,
        dimension: 1024,
    },
    {
        title: "bge-large",
        value: "bge-large",
        context: 512,
        dimension: 1024,
    },
    {
        title: "bge-large:latest",
        value: "bge-large:latest",
        context: 512,
        dimension: 1024,
    },
    {
        title: "paraphrase-multilingual",
        value: "paraphrase-multilingual",
        context: 128,
        dimension: 768,
    },
    {
        title: "paraphrase-multilingual:latest",
        value: "paraphrase-multilingual:latest",
        context: 128,
        dimension: 768,
    },
    {
        title: "granite-embedding",
        value: "granite-embedding",
        context: 128,
        dimension: 768,
    },
    {
        title: "granite-embedding:latest",
        value: "granite-embedding:latest",
        context: 128,
        dimension: 768,
    },
];

async function fetchModels(options: RequestOptions) {
    const credentials = options.credentials;

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

    const ollama = new Ollama({
        host: credentials?.baseUrl,
        headers: {
            ...customHeaders,
            Authorization: `Bearer ${credentials?.apiKey || ""}`,
            "User-Agent": "Enconvo/1.0",
        },
    });

    let models: ListCache.ListItem[] = [];
    const list = await ollama.list();
    models = (await Promise.all(list.models
        .map(async (item) => {
            const _modelInfo = await ollama.show({ model: item.name });

            const model = embeddingModels.find((em) => em.value === item.name);
            return {
                title: item.name,
                value: item.name,
                providerName: item.details.family,
                dimension: model?.dimension,
                context: model?.context || 1024,
            };
        }))).filter((model) => model !== null);

    return models;
}

export default async function main(req: Request) {
    const options = await req.json();

    const modelCache = new ListCache(fetchModels);

    const models = await modelCache.getList(options);
    return Response.json(models);
}
