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
  return { title: `${dict.technology.title} – ${dict.site.title}` };
}

export default async function TechnologyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.technology;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {t.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t.subtitle}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-forest dark:text-forest-light">
                {t.bahanBaku.title}
              </h2>
              <p className="mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.bahanBaku.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.bahanBaku.items.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-forest/10 px-4 py-2 text-sm font-medium text-forest dark:bg-forest/20 dark:text-forest-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Card className="flex items-center justify-center bg-gradient-to-br from-forest/10 to-coffee/10 text-8xl dark:from-forest/5 dark:to-coffee/5">
              🌱
            </Card>
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            {t.ekstraksi.title}
          </h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="leading-relaxed text-cream/80">
              {t.ekstraksi.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-forest dark:text-forest-light">
            {t.produksi.title}
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-forest/20 md:block dark:bg-forest/30" />
            <div className="space-y-8">
              {t.produksi.steps.map((step) => (
                <div key={step.step} className="relative flex items-start gap-6">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-lg font-bold text-white dark:bg-forest-light dark:text-charcoal">
                    {step.step}
                  </span>
                  <div className="pt-2">
                    <h3 className="mb-1 text-lg font-semibold text-charcoal dark:text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                {t.qualityControl.title}
              </h2>
              <p className="mb-6 leading-relaxed text-cream/80">
                {t.qualityControl.description}
              </p>
              <ul className="space-y-3">
                {t.qualityControl.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-forest-light">✓</span>
                    <span className="text-sm text-cream/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                {t.laboratorium.title}
              </h2>
              <p className="leading-relaxed text-cream/80">
                {t.laboratorium.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
