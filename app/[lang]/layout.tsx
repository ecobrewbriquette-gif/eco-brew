import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getDictionary, hasLocale, locales } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const products = dict.products.items.map((p) => ({
    slug: p.slug,
    title: p.title,
  }));

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} lang={lang} products={products} />
      <WhatsAppButton text={dict.contact.whatsapp.text} />
    </>
  );
}
