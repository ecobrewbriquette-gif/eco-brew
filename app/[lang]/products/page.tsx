import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.products.title} – ${dict.site.title}` };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const p = dict.products;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {p.title}
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {p.subtitle}
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {p.items.map((product, i) => (
              <Card key={i} className="flex flex-col">
                <div className="mb-4 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-forest/20 via-coffee/10 to-forest/20 text-6xl dark:from-forest/10 dark:to-forest/5">
                  🔥
                </div>
                <h2 className="mb-2 text-2xl font-bold text-charcoal dark:text-zinc-100">
                  {product.title}
                </h2>
                <p className="mb-1 text-sm font-medium text-forest dark:text-forest-light">
                  {product.tagline}
                </p>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {product.description}
                </p>
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-charcoal dark:text-zinc-200">
                    {p.specs}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.specifications.map((spec, j) => (
                      <div key={j} className="rounded-lg bg-cream-dark/50 px-3 py-2 dark:bg-charcoal">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{spec.label}</span>
                        <p className="text-sm font-medium text-charcoal dark:text-zinc-200">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex gap-3">
                  <Button href={`/${lang}/products/${product.slug}`} variant="primary" size="sm">
                    {p.ctaDetail}
                  </Button>
                  <Button href={`/${lang}/contact`} variant="outline" size="sm">
                    {p.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
