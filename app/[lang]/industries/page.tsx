import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.industries.title} – ${dict.site.title}` };
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const ind = dict.industries;

  const icons: Record<string, string> = {
    building: "🏨",
    utensils: "🍽️",
    coffee: "☕",
    factory: "🏭",
    globe: "🌍",
  };

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {ind.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {ind.subtitle}
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="space-y-12">
            {ind.items.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center`}
              >
                <div className="flex-1">
                  <div className="mb-4 text-5xl">
                    {icons[item.icon] || "📦"}
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-forest dark:text-forest-light">
                    {item.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.benefits.map((benefit, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-charcoal-light"
                      >
                        <span className="mt-0.5 text-forest">✓</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {item.image ? (
                  <div className="flex aspect-square w-full max-w-sm items-center justify-center rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-br from-forest/10 to-coffee/10 text-9xl dark:from-forest/5 dark:to-coffee/5">
                    {icons[item.icon] || "📦"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
