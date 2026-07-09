import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.investors.title} – ${dict.site.title}` };
}

export default async function InvestorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const inv = dict.investors;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {inv.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {inv.subtitle}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-forest dark:text-forest-light">
            {inv.marketOpportunity.title}
          </h2>
          <p className="mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
            {inv.marketOpportunity.description}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {inv.marketOpportunity.items.map((item: string, i: number) => (
              <Card key={i} className="text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">{inv.businessModel.title}</h2>
              <ul className="space-y-3">
                {inv.businessModel.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-forest-light">✓</span>
                    <span className="text-sm text-cream/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold">{inv.growthStrategy.title}</h2>
              <ul className="space-y-3">
                {inv.growthStrategy.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-forest-light">→</span>
                    <span className="text-sm text-cream/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-forest dark:text-forest-light">
                {inv.financialHighlights.title}
              </h2>
              <div className="grid gap-4">
                {inv.financialHighlights.items.map((item: string, i: number) => (
                  <Card key={i}>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold text-forest dark:text-forest-light">
                {inv.roadmap.title}
              </h2>
              <div className="space-y-6">
                {inv.roadmap.items.map((r: { year: string; title: string; description: string }, i: number) => (
                  <div key={i} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-bold text-white dark:bg-forest-light dark:text-charcoal">
                        {r.year.slice(-2)}
                      </div>
                      {i < inv.roadmap.items.length - 1 && (
                        <div className="h-full w-0.5 bg-forest/20" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-semibold text-charcoal dark:text-zinc-100">
                        {r.year} – {r.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {r.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
