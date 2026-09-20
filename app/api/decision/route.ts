import { NextRequest, NextResponse } from "next/server";
import { TypeSafeDecisionEngine } from "@/lib/decision/typesafe-engine";
import { validateDecisionModel } from "@/lib/decision/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenario, state, decisionModel } = body;

    if (!scenario || !state || !decisionModel) {
      return NextResponse.json({ error: "Missing scenario, state, or decisionModel" }, { status: 400 });
    }

    const validation = validateDecisionModel(decisionModel);
    if (!validation.valid) {
      return NextResponse.json({ error: "Invalid decision model: " + validation.errors.join(", ") }, { status: 400 });
    }

    const engine = new TypeSafeDecisionEngine();
    const result = await engine.evaluate(state, decisionModel.questions || {});

    return NextResponse.json({ result, scenario });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
