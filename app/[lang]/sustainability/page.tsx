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
  return { title: `${dict.sustainability.title} – ${dict.site.title}` };
}

export default async function SustainabilityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const s = dict.sustainability;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {s.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {s.subtitle}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-forest dark:text-forest-light">
                {s.circularEconomy.title}
              </h2>
              <p className="mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {s.circularEconomy.description}
              </p>
              <ul className="space-y-3">
                {s.circularEconomy.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-forest">♻️</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="overflow-hidden">
              <img
                src="/images/gallery/ampas-kopi.jpg"
                alt="Ampas kopi sebagai bahan baku briket"
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">{s.emisi.title}</h2>
            <p className="mb-8 leading-relaxed text-cream/80">
              {s.emisi.description}
            </p>
            <div className="rounded-2xl border border-forest-light/30 bg-forest-light/10 p-8 backdrop-blur-sm">
              <p className="text-xl font-semibold text-cream">
                {s.emisi.stat}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold text-forest dark:text-forest-light">
              {s.limbah.title}
            </h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              {s.limbah.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-forest dark:text-forest-light">
            {s.esg.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-forest dark:text-forest-light">
                {s.esg.environmental.title}
              </h3>
              <ul className="space-y-2">
                {s.esg.environmental.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-forest">🌿</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-coffee dark:text-coffee-light">
                {s.esg.social.title}
              </h3>
              <ul className="space-y-2">
                {s.esg.social.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-coffee">🤝</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-charcoal dark:text-zinc-100">
                {s.esg.governance.title}
              </h3>
              <ul className="space-y-2">
                {s.esg.governance.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-charcoal">⚖️</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <h2 className="mb-6 text-center text-3xl font-bold">{s.sdgs.title}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-cream/70">
            {s.sdgs.description}
          </p>
          <div className="grid gap-6 md:grid-cols-4">
            {s.sdgs.items.map((sdg: { number: string; title: string; description: string }, i: number) => (
              <Card key={i} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-forest-light text-xl font-bold text-white">
                  {sdg.number}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-charcoal dark:text-zinc-100">
                  {sdg.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {sdg.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
