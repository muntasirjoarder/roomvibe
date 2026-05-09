"""
RoomVibe — Diagnostic PoC
=========================
Analyses room photos and extracts structured design DNA.

SETUP (one time):
    pip install anthropic pillow

USAGE:
    export ANTHROPIC_API_KEY="sk-ant-..."
    python roomvibe_poc.py photo1.jpg
    python roomvibe_poc.py photo1.jpg photo2.jpg photo3.jpg
"""

import anthropic
import base64
import json
import sys
import io
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠  Pillow not installed — images sent at full size (may be slow)")
    print("   Run: pip install pillow\n")


# ── Config ────────────────────────────────────────────────────────────────────
MAX_PX   = 800    # resize longest edge to this before sending
QUALITY  = 72     # JPEG compression quality (0-100)
MODEL    = "claude-opus-4-5"
# ─────────────────────────────────────────────────────────────────────────────


def compress_image(path: str) -> tuple[str, str]:
    """
    Load image, resize to MAX_PX on longest edge, return (base64, media_type).
    Falls back to raw base64 if Pillow not available.
    """
    if not PIL_AVAILABLE:
        with open(path, "rb") as f:
            data = f.read()
        ext = Path(path).suffix.lower()
        mt = {"jpg": "image/jpeg", "jpeg": "image/jpeg",
              "png": "image/png", "webp": "image/webp"}.get(ext.lstrip("."), "image/jpeg")
        return base64.b64encode(data).decode(), mt

    img = Image.open(path).convert("RGB")
    w, h = img.size
    if w > MAX_PX or h > MAX_PX:
        ratio = MAX_PX / max(w, h)
        img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        print(f"   compressed {w}×{h} → {img.width}×{img.height}")

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=QUALITY)
    return base64.b64encode(buf.getvalue()).decode(), "image/jpeg"


PROMPT = """
You are an expert interior design analyst specialising in Australian residential spaces.

Analyse these room photo(s) and return ONLY valid JSON — no preamble, no markdown fences.

{
  "room_type": "home_office | bedroom | living | dining | kitchen | bathroom | outdoor | unknown",
  "room_type_confidence": 0.0-1.0,
  "estimated_sqm": number_or_null,
  "observed_issues": [
    {
      "id": "snake_case_id",
      "label": "Plain English description, max 8 words",
      "evidence": "One sentence — what specifically you see in the photo",
      "confidence": 0.0-1.0
    }
  ],
  "mood_suggestion": {
    "primary": "calm | sharp | cosy | fresh",
    "reason": "One sentence explanation"
  },
  "dna": {
    "natural_light": "abundant | moderate | limited",
    "ceiling_height": "high | standard | low",
    "style_tags": ["max 3 from: coastal, scandi, japandi, industrial, hamptons, contemporary, farmhouse, maximalist, minimal, eclectic, mid_century, boho"],
    "key_materials": ["2-4 materials you actually see"],
    "dominant_colour": "plain English colour name",
    "spatial_tactics": ["1-3 things the room is doing, good or bad"]
  },
  "australian_relevance_score": 0.0-1.0,
  "confidence": 0.0-1.0
}

Rules:
- observed_issues: only what you actually see. Min 3, max 6. Only include if confidence > 0.65.
- Be specific to THIS room — no generic filler observations.
- australian_relevance_score: how typical is this for an Australian home (climate, materials, layout style).
"""


def analyse(image_paths: list[str]) -> dict:
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

    content = []

    for path in image_paths:
        print(f"   loading {Path(path).name}...")
        b64, mt = compress_image(path)
        kb = round(len(b64) * 3 / 4 / 1024)
        print(f"   → {kb} KB after compression")
        content.append({
            "type": "image",
            "source": {"type": "base64", "media_type": mt, "data": b64}
        })

    content.append({"type": "text", "text": PROMPT})

    print("\n   calling Claude Vision API...")
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": content}]
    )

    raw = response.content[0].text.strip()
    # strip markdown fences if model misbehaves
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    return json.loads(raw)


def pretty_print(result: dict):
    print("\n" + "─" * 52)
    print(f"  ROOM TYPE     {result['room_type'].upper().replace('_', ' ')}"
          f"  ({round(result['room_type_confidence']*100)}% confident)")
    sqm = result.get("estimated_sqm")
    if sqm:
        print(f"  SIZE ESTIMATE ~{sqm} sqm")
    print("─" * 52)

    print("\n  OBSERVED ISSUES")
    for issue in result.get("observed_issues", []):
        tick = "✓" if issue["confidence"] >= 0.8 else "~"
        print(f"  {tick} {issue['label']}")
        print(f"      → {issue['evidence']}")

    mood = result.get("mood_suggestion", {})
    print(f"\n  SUGGESTED VIBE   {mood.get('primary','').upper()}")
    print(f"  {mood.get('reason','')}")

    dna = result.get("dna", {})
    print(f"\n  ROOM DNA")
    print(f"  Light       {dna.get('natural_light','—')}")
    print(f"  Ceiling     {dna.get('ceiling_height','—')}")
    print(f"  Colour      {dna.get('dominant_colour','—')}")
    print(f"  AU score    {round(result.get('australian_relevance_score',0)*100)}%")
    print(f"  Confidence  {round(result.get('confidence',0)*100)}%")
    print(f"  Style       {', '.join(dna.get('style_tags',[]))}")
    print(f"  Materials   {', '.join(dna.get('key_materials',[]))}")
    print(f"  Tactics     {' | '.join(dna.get('spatial_tactics',[]))}")
    print("─" * 52)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    paths = sys.argv[1:]

    # validate files exist
    for p in paths:
        if not Path(p).exists():
            print(f"File not found: {p}")
            sys.exit(1)

    print(f"\nRoomVibe PoC — analysing {len(paths)} photo(s)\n")

    result = analyse(paths)

    pretty_print(result)

    # save JSON output
    out_path = "roomvibe_result.json"
    with open(out_path, "w") as f:
        json.dump(result, f, indent=2)
    print(f"\n  Full JSON saved to: {out_path}")
    print("  This is your first knowledge_base.jsonl record.\n")


if __name__ == "__main__":
    main()
