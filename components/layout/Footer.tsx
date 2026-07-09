import Link from "next/link";
import Container from "@/components/ui/Container";
import NewsletterForm from "./NewsletterForm";

interface FooterDict {
  description: string;
  quickLinks: string;
  products: string;
  contact: string;
  newsletter: {
    title: string;
    placeholder: string;
    button: string;
    success: string;
  };
  copyright: string;
  social: Record<string, string>;
}

interface ProductItem {
  slug: string;
  title: string;
}

export default function Footer({
  dict,
  lang,
  products,
}: {
  dict: FooterDict;
  lang: string;
  products: ProductItem[];
}) {
  return (
    <footer className="mt-auto border-t border-cream-dark bg-charcoal text-zinc-300 dark:border-zinc-800">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-sm font-bold text-white">
                EB
              </span>
              EcoBrew
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              {dict.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">{dict.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Beranda", href: "/" },
                { label: "Tentang", href: "/about" },
                { label: "Teknologi", href: "/technology" },
                { label: "Keberlanjutan", href: "/sustainability" },
                { label: "Blog", href: "/blog" },
                { label: "Investor", href: "/investors" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${lang}${link.href}`}
                    className="transition-colors hover:text-forest-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">{dict.products}</h3>
            <ul className="space-y-2 text-sm">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${lang}/products/${p.slug}`}
                    className="transition-colors hover:text-forest-light"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">{dict.newsletter.title}</h3>
            <NewsletterForm
              placeholder={dict.newsletter.placeholder}
              button={dict.newsletter.button}
              successText={dict.newsletter.success}
            />
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-white">Social</h4>
              <div className="flex gap-3">
                {Object.entries(dict.social).map(([key, label]) => (
                  <a
                    key={key}
                    href="#"
                    className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs transition-colors hover:bg-forest"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-700 pt-6 text-center text-xs text-zinc-500">
          {dict.copyright}
        </div>
      </Container>
    </footer>
  );
}
