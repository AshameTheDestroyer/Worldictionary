import { Router } from "express";
import { ChatWithAI } from "./ai.services";

export const AI_ROUTE = "/ai";
export const AIRouter = Router();

AIRouter.post(`${AI_ROUTE}/chat`, ChatWithAI);
