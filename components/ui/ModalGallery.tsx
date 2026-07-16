"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

interface GalleryImage {
  title: string;
  description: string;
  category: string;
  image?: string;
  images?: string[];
}

export default function ModalGallery({
  images,
  currentIndex,
  onClose,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(currentIndex);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    setSubIndex(0);
  }, [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        const itemImages = images[index].images;
        if (itemImages && subIndex < itemImages.length - 1) {
          setSubIndex((i) => i + 1);
        } else {
          setIndex((i) => (i + 1) % images.length);
        }
      }
      if (e.key === "ArrowLeft") {
        if (subIndex > 0) {
          setSubIndex((i) => i - 1);
        } else {
          setIndex((i) => (i - 1 + images.length) % images.length);
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose, index, subIndex]);

  const img = images[index];
  const currentImages = img.images?.length ? img.images : (img.image ? [img.image] : []);
  const currentSrc = currentImages[subIndex] || "";

  const canGoPrev = subIndex > 0;
  const canGoNext = currentImages.length > 1 && subIndex < currentImages.length - 1;

  const goPrev = () => {
    if (subIndex > 0) {
      setSubIndex((i) => i - 1);
    } else {
      setIndex((i) => (i - 1 + images.length) % images.length);
    }
  };

  const goNext = () => {
    if (currentImages.length > 1 && subIndex < currentImages.length - 1) {
      setSubIndex((i) => i + 1);
    } else {
      setIndex((i) => (i + 1) % images.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-white transition-colors hover:text-cream"
      >
        <FiX size={32} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 z-10 text-white transition-colors hover:text-cream"
      >
        <FiChevronLeft size={40} />
      </button>

      <div
        className="flex max-h-[85vh] max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentSrc ? (
          <div className="relative mb-4 w-full max-w-3xl">
            <img
              src={currentSrc}
              alt={img.title}
              className="max-h-[65vh] w-full rounded-2xl object-contain"
            />
            {currentImages.length > 1 && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                {subIndex + 1} / {currentImages.length}
              </span>
            )}
          </div>
        ) : (
          <div className="mb-4 flex aspect-video w-full max-w-2xl items-center justify-center rounded-2xl bg-forest/20 text-8xl font-bold text-forest dark:bg-cream/10 dark:text-cream">
            {img.category === "produksi" && "🏭"}
            {img.category === "mesin" && "⚙️"}
            {img.category === "gudang" && "🏗️"}
            {img.category === "produk" && "🔥"}
            {img.category === "laboratorium" && "🔬"}
            {img.category === "mitra" && "🤝"}
          </div>
        )}
        <h3 className="text-center text-xl font-semibold text-white">
          {img.title}
        </h3>
        <p className="mt-1 text-center text-zinc-300">{img.description}</p>
        <span className="mt-2 rounded-full bg-forest/30 px-3 py-1 text-sm text-cream">
          {img.category}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-4 z-10 text-white transition-colors hover:text-cream"
      >
        <FiChevronRight size={40} />
      </button>
    </div>
  );
}
