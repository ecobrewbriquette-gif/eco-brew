import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const product = dict.products.items.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.title} – ${dict.site.title}` };
}

export async function generateStaticParams() {
  const locales = ["id", "en"];
  const slugs = ["premium", "horeca", "industrial", "bbq"];
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const p = dict.products;
  const product = p.items.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container>
          <Link
            href={`/${lang}/products`}
            className="mb-6 inline-flex items-center text-sm font-medium text-forest transition-colors hover:text-forest-light dark:text-forest-light"
          >
            ← {dict.nav.products}
          </Link>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-forest/20 via-coffee/10 to-forest/20 text-8xl dark:from-forest/10 dark:to-forest/5">
                🔥
              </div>
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-forest dark:text-forest-light">
                {product.title}
              </h1>
              <p className="mb-6 text-lg text-coffee dark:text-coffee-light">
                {product.tagline}
              </p>
              <p className="mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href={`/${lang}/contact`} variant="primary" size="lg">
                  {p.cta}
                </Button>
                <Button variant="outline" size="lg">
                  {p.downloadDatasheet}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-charcoal dark:text-zinc-100">
                {p.specs}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-cream-dark bg-white p-4 dark:border-zinc-700 dark:bg-charcoal-light"
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {spec.label}
                    </span>
                    <p className="mt-1 font-semibold text-charcoal dark:text-zinc-100">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h2 className="mb-4 text-2xl font-bold text-charcoal dark:text-zinc-100">
                  {p.benefits}
                </h2>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/20 text-xs text-forest dark:bg-forest/30 dark:text-forest-light">
                        ✓
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-charcoal dark:text-zinc-100">
                  {p.applications}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-cream-dark px-3 py-1.5 text-sm text-charcoal dark:bg-charcoal dark:text-zinc-300"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
