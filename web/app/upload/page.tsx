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
    <main className="flex flex-col flex-1 items-center justify-center px-6 py-16">
      <div className="max-w-sm w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Add a room photo
          </h1>
          <p className="text-stone-500">
            A clear, wide-angle shot works best. Up to 3 photos supported.
          </p>
        </div>

        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-8 text-stone-500">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
            <span>Uploading…</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Camera — getUserMedia primes iOS permission before opening file input */}
            <button
              onClick={handleCameraClick}
              className="w-full rounded-2xl bg-stone-900 text-stone-50 py-4 px-6 text-lg font-semibold
                         active:scale-95 transition-transform"
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
              className="w-full rounded-2xl border-2 border-stone-200 text-stone-700 py-4 px-6 text-lg font-semibold
                         active:scale-95 transition-transform"
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
          <p className="text-center text-red-600 text-sm">{error}</p>
        )}
      </div>
    </main>
  );
}
