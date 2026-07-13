import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.site.title} – ${dict.site.tagline}`,
    description: dict.site.description,
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.home;

  return (
    <>
      <HeroSection dict={h.hero} lang={lang} />
      <ValuePropositionSection dict={h.valueProposition} />
      <KeunggulanSection dict={h.keunggulan} />
      <ProdukUnggulanSection dict={h.produkUnggulan} lang={lang} />
      <SustainabilitySection dict={h.sustainability} />
      <CTASection dict={h.cta} lang={lang} />
    </>
  );
}

function HeroSection({
  dict,
  lang,
}: {
  dict: { title: string; subtitle: string; cta: string; ctaSecondary: string };
  lang: string;
}) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-forest via-forest-dark to-charcoal">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      </div>
      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-cream backdrop-blur-sm">
            {dict.subtitle.split(" ").slice(-2).join(" ")}
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {dict.title}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-cream/80 md:text-xl">
            {dict.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={`/${lang}/products`} variant="secondary" size="lg">
              {dict.cta}
            </Button>
            <Button href={`/${lang}/contact`} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              {dict.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent dark:from-black" />
    </section>
  );
}

function ValuePropositionSection({
  dict,
}: {
  dict: { title: string; items: { icon: string; title: string; description: string }[] };
}) {
  const icons: Record<string, string> = {
    recycle: "♻️",
    leaf: "🌿",
    award: "🏆",
    globe: "🌍",
  };

  return (
    <Section id="value-prop">
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold text-forest dark:text-forest-light md:text-4xl">
          {dict.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, i) => (
            <Card key={i} className="text-center">
              <div className="mb-4 text-4xl">{icons[item.icon] || "🌱"}</div>
              <h3 className="mb-2 text-lg font-semibold text-charcoal dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function KeunggulanSection({
  dict,
}: {
  dict: { title: string; items: { title: string; description: string }[] };
}) {
  return (
    <Section dark id="keunggulan">
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {dict.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-forest-light text-lg font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProdukUnggulanSection({
  dict,
  lang,
}: {
  dict: { title: string; subtitle: string; cta: string; items: { title: string; description: string; slug: string }[] };
  lang: string;
}) {
  return (
    <Section id="produk-unggulan">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-forest dark:text-forest-light md:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            {dict.subtitle}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, i) => (
            <Card key={i}>
              <div className="mb-4 flex aspect-vivo items-center justify-center rounded-xl bg-gradient-to-br from-forest/20 to-coffee/20 text-5xl dark:from-forest/10 dark:to-coffee/10">
                🔥
              </div>
              <h3 className="mb-2 text-lg font-semibold text-charcoal dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
              <Button
                href={`/${lang}/products/${item.slug}`}
                variant="outline"
                size="sm"
              >
                Detail
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={`/${lang}/products`} variant="primary">
            {dict.cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function SustainabilitySection({
  dict,
}: {
  dict: { title: string; subtitle: string; stats: { value: string; label: string }[] };
}) {
  return (
    <Section dark id="sustainability">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{dict.title}</h2>
          <p className="mx-auto max-w-2xl text-cream/70">{dict.subtitle}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {dict.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="mb-2 text-4xl font-bold text-forest-light md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm text-cream/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CTASection({
  dict,
  lang,
}: {
  dict: { title: string; subtitle: string; button: string };
  lang: string;
}) {
  return (
    <Section>
      <Container className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-forest dark:text-forest-light md:text-4xl">
          {dict.title}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-zinc-600 dark:text-zinc-400">
          {dict.subtitle}
        </p>
        <Button href={`/${lang}/contact`} variant="primary" size="lg">
          {dict.button}
        </Button>
      </Container>
    </Section>
  );
}
