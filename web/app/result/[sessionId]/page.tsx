import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ filename?: string }>;
}) {
  const { filename } = await searchParams;

  return (
    <main className="flex flex-col flex-1 items-center justify-center px-6 py-16 text-center">
      <div className="max-w-sm w-full flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-5xl">✓</div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Photo received
          </h1>
          {filename && (
            <p className="text-stone-500 text-sm break-all">
              {decodeURIComponent(filename)}
            </p>
          )}
          <p className="text-stone-400 text-sm mt-2">
            Recommendations coming soon — this is the walking skeleton.
          </p>
        </div>

        <Link
          href="/upload"
          className="w-full rounded-2xl border-2 border-stone-200 text-stone-700 py-4 px-6 text-base font-semibold
                     active:scale-95 transition-transform"
        >
          Upload another photo
        </Link>
      </div>
    </main>
  );
}
