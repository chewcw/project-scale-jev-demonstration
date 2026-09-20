export const tenderScenario = {
  name: "Tender → Risk → Bid Decision",
  description: "Evaluate whether to pursue a tender based on structured requirements and Jev decision.",
  defaultInput: {
    project: "Water Treatment Plant Upgrade",
    customer: "Indah Water",
    deadlineDays: 18,
    estimatedValue: 2500000,
    requirements: [
      { id: "REQ-001", category: "PLC", requirement: "PLC system must support redundant CPU architecture" },
      { id: "REQ-002", category: "SCADA", requirement: "SCADA system must support OPC UA" },
      { id: "REQ-003", category: "Cybersecurity", requirement: "System must comply with customer cybersecurity requirements" },
    ],
    knownCapabilities: ["PLC engineering", "SCADA engineering", "OPC UA", "Industrial networking"],
  },
  defaultDecisionModel: {
    questions: {
      overallRisk: { id: "overallRisk", type: "choice" as const, question: "What is the overall risk level for this tender?", options: ["LOW", "MEDIUM", "HIGH"] },
      technicalFit: { id: "technicalFit", type: "choice" as const, question: "How well does the company technically fit this tender?", options: ["FIT", "PARTIAL_FIT", "NO_FIT", "UNCLEAR"] },
      scheduleRisk: { id: "scheduleRisk", type: "choice" as const, question: "What is the schedule risk?", options: ["LOW", "MEDIUM", "HIGH"] },
      commercialRisk: { id: "commercialRisk", type: "choice" as const, question: "What is the commercial risk?", options: ["LOW", "MEDIUM", "HIGH"] },
      bidRecommendation: { id: "bidRecommendation", type: "choice" as const, question: "What should happen to this opportunity?", options: ["PURSUE", "REVIEW", "DO_NOT_PURSUE"] },
    },
  } as const,
};
