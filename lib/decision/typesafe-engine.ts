import { choice, TypeSafeClient } from "@typesafe-ai/sdk";
import type { DecisionQuestionConfig, DecisionResult } from "./types.js";

export interface DecisionEngine {
  evaluate(
    state: Record<string, unknown>,
    questions: Record<string, DecisionQuestionConfig>
  ): Promise<DecisionResult>;
}

export class TypeSafeDecisionEngine implements DecisionEngine {
  private client: TypeSafeClient;

  constructor() {
    this.client = new TypeSafeClient();
  }

  async evaluate(
    state: Record<string, unknown>,
    questions: Record<string, DecisionQuestionConfig>
  ): Promise<DecisionResult> {
    // Transform our JSON config into TypeSafe SDK definitions
    const sdkQuestions: Record<string, unknown> = {};

    for (const [key, config] of Object.entries(questions)) {
      if (config.type === "choice") {
        const criteria: Record<string, null> = {};
        for (const opt of config.options) {
          criteria[opt] = null;
        }
        sdkQuestions[key] = choice(config.question, criteria);
      } else {
        // For simplicity in demo, treat non-choice as choice with a single option
        const criteria: Record<string, null> = {};
        for (const opt of config.options || ["YES", "NO"]) {
          criteria[opt] = null;
        }
        sdkQuestions[key] = choice(config.question, criteria);
      }
    }

    const response = await this.client.systemOne({
      state: state as import("@typesafe-ai/sdk").EntryType,
      questions: sdkQuestions as Record<string, import("@typesafe-ai/sdk").ChoiceQuestion>,
    });

    return {
      answers: response.answers as Record<string, unknown>,
      raw: response,
    };
  }
}
