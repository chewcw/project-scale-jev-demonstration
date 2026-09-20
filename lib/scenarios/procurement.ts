export const procurementScenario = {
  name: "Vendor Quote → Compliance → Recommendation",
  description: "Compare vendor quotes with deterministic checks and Jev compliance decisions.",
  requirements: [
    {
      leadTimeDays: 28,
      budget: {
        "min": 10000,
        "max": 20000
      },
      protocol: ["OPC UA", "Modbus"],
      redundancy: true,
      warrantyMonths: 12,
    }
  ],
  vendorQuotes: [
    {
      vendor: "Vendor A",
      model: "PLC-X100",
      price: 18500,
      leadTimeDays: 24,
      protocol: "OPC UA",
      redundancy: true,
      warrantyMonths: 24,
    },
    {
      vendor: "Vendor B",
      model: "PLC-Y200",
      price: 14200,
      leadTimeDays: 42,
      protocol: "Modbus TCP",
      redundancy: false,
      warrantyMonths: 12,
    },
    {
      vendor: "Vendor C",
      model: "PLC-Z300",
      price: 22100,
      leadTimeDays: 21,
      protocol: "OPC UA",
      redundancy: true,
      warrantyMonths: 36,
    },
  ],
  defaultDecisionModel: {
    questions: {
      compliance: { id: "compliance", type: "choice" as const, question: "Which vendor quote comply with requirements?", options: ["Vendor A", "Vendor B", "Vendor C", "None"] },
      anyCompliance: { id: "anyCompliance", type: "noul" as const, question: "Is there at least one vendor comply with requirements completely?", options: ["true", "false"] },
      technicalSuitability: { id: "technicalSuitability", type: "choice" as const, question: "Is the technical solution suitable?", options: ["SUITABLE", "PARTIAL", "UNSUITABLE", "UNCLEAR"] },
      procurementRisk: { id: "procurementRisk", type: "choice" as const, question: "What is the procurement risk?", options: ["LOW", "MEDIUM", "HIGH"] },
    },
  } as const,
};
