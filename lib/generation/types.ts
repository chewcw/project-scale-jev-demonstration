export interface GenerationInput {
  scenario: string;
  structuredData: Record<string, unknown>;
  decisionResult?: Record<string, unknown>;
  deterministicChecks?: Array<{ rule: string; status: string; message: string }>
  promptType: "explanation" | "proposal" | "test_description" | "summary";
}

export interface GenerationService {
  generate(input: GenerationInput): Promise<string>;
}
