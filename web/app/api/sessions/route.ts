import type { NextRequest } from "next/server";
import { randomUUID } from "crypto";

// In-memory store for walking skeleton. Replaced by Vercel KV in issue #5.
const sessions = new Map<string, { filename: string; createdAt: string }>();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("photo") as File | null;

  if (!file || file.size === 0) {
    return Response.json({ error: "No photo uploaded" }, { status: 400 });
  }

  const sessionId = randomUUID();
  sessions.set(sessionId, {
    filename: file.name,
    createdAt: new Date().toISOString(),
  });

  return Response.json({ sessionId, filename: file.name }, { status: 201 });
}
