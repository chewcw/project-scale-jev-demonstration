import { NextRequest, NextResponse } from "next/server";
import { VercelGenerationService } from "@/lib/generation/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenario, structuredData, decisionResult, deterministicChecks, promptType } = body;
    if (!scenario || !structuredData || !promptType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const service = new VercelGenerationService();
    const text = await service.generate({
      scenario,
      structuredData,
      decisionResult,
      deterministicChecks,
      promptType,
    });
    return NextResponse.json({ text, scenario });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "LLM service error" }, { status: 500 });
  }
}
