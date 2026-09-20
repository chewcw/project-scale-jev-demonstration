// import { createOpenAI, openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import type { GenerationInput, GenerationService } from "./types.js";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export class VercelGenerationService implements GenerationService {
  async generate(input: GenerationInput): Promise<string> {
    // const baseUrl = process.env.LLM_BASE_URL || "https://api.openai.com/v1";
    const modelName = process.env.LLM_MODEL || "gpt-4o-mini";

    let systemPrompt = "You are a technical assistant for an enterprise AI architecture demonstration. Be concise. Separate facts from AI judgments clearly.";
    let userPrompt = "";

    switch (input.promptType) {
      case "explanation":
        userPrompt = `Explain the following decision result in plain language. Structured facts: ${JSON.stringify(input.structuredData)}. Decision: ${JSON.stringify(input.decisionResult)}. Deterministic checks: ${JSON.stringify(input.deterministicChecks || [])}. Do not invent new facts. Distinguish between AI decision and deterministic rules.`;
        break;
      case "proposal":
        userPrompt = `Draft a brief proposal paragraph for: ${JSON.stringify(input.structuredData)}. Decision: ${JSON.stringify(input.decisionResult)}.`;
        break;
      case "test_description":
        userPrompt = `Generate a short engineering test description for: ${JSON.stringify(input.structuredData)}. Decision: ${JSON.stringify(input.decisionResult)}.`;
        break;
      case "summary":
        userPrompt = `Summarize the vendor comparison: ${JSON.stringify(input.structuredData)}. Decision: ${JSON.stringify(input.decisionResult)}.`;
        break;
    }

    // const aiProvider = baseUrl !== "https://api.openai.com/v1" ? createOpenAI({ baseURL: baseUrl }) : openai;
    // const aiProvider = (modelName: string) => modelName;
    const nim = createOpenAICompatible({
      name: "nim",
      baseURL: "https://integrate.api.nvidia.com/v1",
      headers: {
        Authorization: `Bearer ${process.env.NIM_API_KEY}`,
      },
    });
    const aiProvider = (modelName: string) => nim.chatModel(modelName);
    const result = await generateText({
      model: aiProvider(modelName),
      system: systemPrompt,
      prompt: userPrompt,
    });

    return result.text;
  }
}
