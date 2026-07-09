"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ModalGallery from "@/components/ui/ModalGallery";

interface GalleryItem {
  category: string;
  title: string;
  description: string;
  image?: string;
}

interface GalleryDict {
  gallery: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    items: GalleryItem[];
  };
}

export default function GalleryPage() {
  const params = useParams();
  const lang = params?.lang as string;
  const [dict, setDict] = useState<GalleryDict | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lang) {
      import(`@/app/dictionaries/${lang}.json`).then((m) => setDict(m.default));
    }
  }, [lang]);

  if (!dict) return null;

  const g = dict.gallery;
  const categories = g.categories;
  const items: GalleryItem[] = g.items;

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {g.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {g.subtitle}
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === key
                    ? "bg-forest text-white"
                    : "bg-cream-dark text-charcoal hover:bg-forest/20 dark:bg-charcoal-light dark:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <button
                key={i}
                onClick={() => setModalIndex(items.indexOf(item))}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-charcoal-light"
              >
                {item.image ? (
                  <div className="relative aspect-video">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-forest/20 to-coffee/10 text-6xl transition-transform duration-300 group-hover:scale-105 dark:from-forest/10 dark:to-coffee/5">
                    {item.category === "produksi" && "🏭"}
                    {item.category === "mesin" && "⚙️"}
                    {item.category === "gudang" && "🏗️"}
                    {item.category === "produk" && "🔥"}
                    {item.category === "laboratorium" && "🔬"}
                    {item.category === "mitra" && "🤝"}
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-200">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </Section>
      {modalIndex !== null && (
        <ModalGallery
          images={items}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </>
  );
}
