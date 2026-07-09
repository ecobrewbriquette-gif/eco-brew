import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const post = (dict.blog.items as BlogPost[]).find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} – ${dict.site.title}` };
}

export async function generateStaticParams() {
  const locales = ["id", "en"];
  const slugs = [
    "manfaat-briket-biomassa",
    "circular-economy-kopi",
    "eco-brew-ekspor-perdana",
    "tips-memilih-briket",
    "teknologi-produksi-briket",
    "eco-brew-green-award",
  ];
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const post = (dict.blog.items as BlogPost[]).find((p) => p.slug === slug);
  if (!post) notFound();

  const categories = dict.blog.categories as Record<string, string>;

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container>
          <Link
            href={`/${lang}/blog`}
            className="mb-6 inline-flex items-center text-sm font-medium text-forest transition-colors hover:text-forest-light dark:text-forest-light"
          >
            ← {dict.blog.title}
          </Link>
          <article className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest dark:bg-forest/20 dark:text-forest-light">
                {categories[post.category] || post.category}
              </span>
              <span className="text-xs text-zinc-400">{post.date}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-forest dark:text-forest-light md:text-4xl">
              {post.title}
            </h1>
            <p className="mb-8 text-zinc-500 dark:text-zinc-400">{post.author}</p>
            <div className="prose prose-zinc mx-auto max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.content}
              </p>
              <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
