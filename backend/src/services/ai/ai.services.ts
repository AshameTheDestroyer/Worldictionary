import { Handler } from "express";
import { AIAssistant } from "./ai.model";

export const ChatWithAI: Handler = async (request, response) => {
    try {
        const { prompt, conversationID: _conversationID } = request.body;
        const { message, conversationID } = await AIAssistant.Chat(
            prompt,
            _conversationID
        );

        response.status(200).json({
            message,
            conversationID,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
