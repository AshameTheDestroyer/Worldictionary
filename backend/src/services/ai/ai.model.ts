import { GoogleGenAI } from "@google/genai";

export class AIAssistant {
    static #model: GoogleGenAI;

    static #instance: AIAssistant;

    static readonly #CHAT_MAXIMUM_ENTRY_COUNT = 20;
    #chatMemory: Map<string, string[]> = new Map<string, string[]>();

    static get Instance(): AIAssistant {
        return (this.#instance ??= new AIAssistant());
    }

    static get Model() {
        return (this.#model ??= AIAssistant.#model =
            new GoogleGenAI({
                apiKey: process.env.AI_API_KEY,
            }));
    }

    static async Chat(prompt: string, conversationID?: string) {
        const conversationID_ = conversationID ?? crypto.randomUUID();
        const conversation =
            this.Instance.#chatMemory.get(conversationID_) ?? [];

        conversation.push(`User: ${prompt}`);
        while (conversation.length > AIAssistant.#CHAT_MAXIMUM_ENTRY_COUNT) {
            conversation.shift();
        }

        this.Instance.#chatMemory.set(conversationID_, conversation);

        const AIResponse = await AIAssistant.Model.models.generateContent({
            contents: conversation,
            model: process.env.AI_MODEL,
            config: {
                temperature: Number(process.env.AI_TEMPERATURE),
                systemInstruction: process.env.AI_SYSTEM_INSTRUCTIONS,
            },
        });

        if (typeof AIResponse.text == "string") {
            conversation.push(`Assistant: ${AIResponse.text}`);
            while (
                conversation.length > AIAssistant.#CHAT_MAXIMUM_ENTRY_COUNT
            ) {
                conversation.shift();
            }

            this.Instance.#chatMemory.set(conversationID_, conversation);
        }

        return { message: AIResponse.text, conversationID: conversationID_ };
    }
}
