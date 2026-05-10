import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-6 py-16 text-center">
      <div className="max-w-sm w-full flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 leading-tight">
            Your room,
            <br />
            redesigned.
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Upload a photo. Get two redesigns — one to dream about, one you can
            actually do this weekend.
          </p>
        </div>

        <Link
          href="/upload"
          className="w-full rounded-2xl bg-stone-900 text-stone-50 py-4 px-6 text-lg font-semibold
                     active:scale-95 transition-transform"
        >
          Redesign my room
        </Link>

        <p className="text-stone-400 text-sm">
          Bedrooms &amp; living rooms · AU only
        </p>
      </div>
    </main>
  );
}
