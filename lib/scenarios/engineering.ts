export const engineeringScenario = {
  name: "Engineering Cross-check → FAT",
  description: "Cross-check engineering data, run Jev decision, generate FAT form.",
  records: [
    {
      tag: "PT-101",
      description: "Pressure Transmitter",
      signal: "4-20mA",
      customerRange: "0-10 bar",
      drawingRange: "0-10 bar",
      unit: "bar",
    },
    {
      tag: "FT-202",
      description: "Flow Transmitter",
      signal: "4-20mA",
      customerRange: "0-100 m3/h",
      drawingRange: "0-16 bar",
      unit: "m3/h",
    },
    {
      tag: "LT-303",
      description: "Level Transmitter",
      signal: "4-20mA",
      customerRange: "0-5 m",
      drawingRange: "0-?",
      unit: "m",
    },
  ],
  defaultDecisionModel: {
    questions: {
      matchDecision: { id: "matchDecision", type: "choice" as const, question: "Does the engineering data match the drawing?", options: ["MATCH", "MISMATCH", "UNCLEAR"] },
      severity: { id: "severity", type: "choice" as const, question: "What is the severity of any discrepancy?", options: ["LOW", "MEDIUM", "HIGH"] },
    },
  } as const,
};
