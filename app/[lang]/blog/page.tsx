import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.blog.title} – ${dict.site.title}` };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const b = dict.blog;

  const categories = b.categories as Record<string, string>;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {b.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {b.subtitle}
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {(b.items as BlogPost[]).map((post, i) => (
                  <Card key={i}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest dark:bg-forest/20 dark:text-forest-light">
                        {categories[post.category] || post.category}
                      </span>
                      <span className="text-xs text-zinc-400">{post.date}</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-charcoal dark:text-zinc-100">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        {post.author}
                      </span>
                      <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="text-sm font-medium text-forest transition-colors hover:text-forest-light dark:text-forest-light"
                      >
                        {b.readMore} →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Card className="sticky top-24">
                <h3 className="mb-4 font-semibold text-charcoal dark:text-zinc-100">
                  {dict.nav.blog}
                </h3>
                <div className="space-y-2">
                  {Object.entries(categories).map(([key, label]) => (
                    <button
                      key={key}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-600 transition-colors hover:bg-cream-dark dark:text-zinc-400 dark:hover:bg-charcoal"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
