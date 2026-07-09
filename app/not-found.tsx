import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 dark:bg-black">
      <h1 className="mb-4 text-6xl font-bold text-forest dark:text-forest-light">
        404
      </h1>
      <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
        Halaman tidak ditemukan
      </p>
      <Link
        href="/"
        className="rounded-xl bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-light"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
