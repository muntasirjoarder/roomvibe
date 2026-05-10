"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCameraClick() {
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        setError(
          "Camera access denied. On iPhone: Settings → Safari → Camera → Allow."
        );
        return;
      }
    }
    cameraRef.current?.click();
  }

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);

    const body = new FormData();
    body.append("photo", file);

    try {
      const res = await fetch("/api/sessions", { method: "POST", body });
      if (!res.ok) throw new Error("Upload failed");
      const { sessionId, filename } = await res.json();
      router.push(`/result/${sessionId}?filename=${encodeURIComponent(filename)}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <main className="flex flex-col flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <div className="max-w-sm sm:max-w-md w-full mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-sans text-title-xl text-ink">
            Add a room photo
          </h1>
          <p className="text-body text-ink-muted">
            A clear, wide-angle shot works best. Up to 3 photos supported.
          </p>
        </div>

        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-8 text-ink-muted">
            <div className="w-8 h-8 border-2 border-stone-soft border-t-ink rounded-full animate-spin" />
            <span className="text-body">Uploading…</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Camera — getUserMedia primes iOS permission before opening file input */}
            <button
              onClick={handleCameraClick}
              className="inline-flex items-center justify-center w-full bg-clay-500 text-canvas py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] active:bg-clay-700 hover:bg-clay-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Take a photo
            </button>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />

            {/* Gallery — opens photo picker */}
            <button
              onClick={() => galleryRef.current?.click()}
              className="inline-flex items-center justify-center w-full bg-surface text-ink border border-stone-line py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] hover:bg-stone-soft transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose from gallery
            </button>
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 text-body">{error}</p>
        )}
      </div>
    </main>
  );
}
