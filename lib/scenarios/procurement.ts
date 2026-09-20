export const procurementScenario = {
  name: "Vendor Quote → Compliance → Recommendation",
  description: "Compare vendor quotes with deterministic checks and Jev compliance decisions.",
  vendorQuotes: [
    {
      vendor: "Vendor A",
      model: "PLC-X100",
      price: 18500,
      leadTimeDays: 28,
      requiredProtocol: "OPC UA",
      offeredProtocol: "OPC UA",
      redundancy: true,
      warrantyMonths: 24,
    },
    {
      vendor: "Vendor B",
      model: "PLC-Y200",
      price: 14200,
      leadTimeDays: 42,
      requiredProtocol: "OPC UA",
      offeredProtocol: "Modbus TCP",
      redundancy: false,
      warrantyMonths: 12,
    },
    {
      vendor: "Vendor C",
      model: "PLC-Z300",
      price: 22100,
      leadTimeDays: 21,
      requiredProtocol: "OPC UA",
      offeredProtocol: "OPC UA",
      redundancy: true,
      warrantyMonths: 36,
    },
  ],
  defaultDecisionModel: {
    questions: {
      compliance: { id: "compliance", type: "choice" as const, question: "Does the vendor quote comply with requirements?", options: ["COMPLIANT", "DEVIATION", "UNCLEAR"] },
      technicalSuitability: { id: "technicalSuitability", type: "choice" as const, question: "Is the technical solution suitable?", options: ["SUITABLE", "PARTIAL", "UNSUITABLE", "UNCLEAR"] },
      procurementRisk: { id: "procurementRisk", type: "choice" as const, question: "What is the procurement risk?", options: ["LOW", "MEDIUM", "HIGH"] },
    },
  } as const,
};
