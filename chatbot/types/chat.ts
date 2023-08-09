import { Document } from "langchain/document";

export type Message = {
    message: string;
    isStreaming?: boolean;
    sourceDocs?: any[][];
}