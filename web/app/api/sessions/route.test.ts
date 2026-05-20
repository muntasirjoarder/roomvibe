import { describe, it, expect } from "vitest";
import type { NextRequest } from "next/server";
import { POST } from "./route";

function buildRequest(formData: FormData): NextRequest {
  return new Request("http://localhost/api/sessions", {
    method: "POST",
    body: formData,
  }) as unknown as NextRequest;
}

describe("POST /api/sessions", () => {
  it("returns sessionId and filename for a valid photo upload", async () => {
    const photo = new File([new Uint8Array([1, 2, 3, 4])], "room.jpg", {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await POST(buildRequest(formData));

    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.filename).toBe("room.jpg");
    expect(typeof body.sessionId).toBe("string");
    expect(body.sessionId.length).toBeGreaterThan(0);
  });
});
