//import { getModelResponse } from './OpenAi';
import axios from "axios";
import OpenAI from "openai";
import { MongoClient, Db } from "mongodb";

//dotenv.config();
const openai = new OpenAI()
// Function to get vector embedding from OpenAI API
async function getEmbedding(query: string, openaiKey: string): Promise<number[]> {
    const url = "https://api.openai.com/v1/embeddings";
    const headers = {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
    };

    const data = {
        "input": query,
        "model": "text-embedding-ada-002"
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data["data"][0]["embedding"];
    } catch (error: any) {
        throw new Error(`Failed to get embedding. Status code: ${error.response?.status}, Response: ${error.response?.data}`);
    }
}

// Function to find similar documents in MongoDB using vector search
async function findSimilarDocuments(
    embedding: number[],
    mongoUrl: string,
    dbName: string,
    collectionName: string
): Promise<any[]> {
    const client = new MongoClient(mongoUrl);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const pipeline = [
            {
                "$vectorSearch": {
                    "queryVector": embedding,
                    "path": "plot_embedding",
                    "numCandidates": 100,
                    "limit": 1, // Number of files to get
                    "index": "Vectorsearch",
                }
            }
        ];

        const documents = await collection.aggregate(pipeline).toArray();
        return documents;
    } catch (error) {
        throw new Error(`Failed to find similar documents: ${error}`);
    } finally {
        await client.close();
    }
}

// Function to query the model
export async function queryModel(userQuery: string): Promise<string> {
    try {
        const openaiKey = process.env.OPENAI_KEY as string;
        const mongoUrl = process.env.MONGO_DB_URI as string;
        const dbName = "RAG";
        const collectionName = "RAG";

        const keywords = ["database", "databases"];
        let modifiedQuery = userQuery;

        if (keywords.some(keyword => userQuery.toLowerCase().includes(keyword))) {
            const embedding = await getEmbedding(userQuery, openaiKey);
            const documents = await findSimilarDocuments(embedding, mongoUrl, dbName, collectionName);
            
            const databaseResponse = documents.map(doc => doc["plot"]).filter(Boolean);
            const file = documents.map(doc => doc["file"]).filter(Boolean);
            
            modifiedQuery = `filename "${file}", database information "${databaseResponse}", this is the user prompt: ${userQuery}.`;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content:modifiedQuery }],
            temperature: 0.7,
            max_tokens: 150,
          });;
        return response.choices[0].message?.content || "No response received.";
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }
}