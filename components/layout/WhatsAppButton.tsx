"use client";

import { FiPhone } from "react-icons/fi";

export default function WhatsAppButton({ text }: { text: string }) {
  const handleClick = () => {
    const url = `https://wa.me/6282135322803?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Chat via WhatsApp"
    >
      <FiPhone size={24} />
    </button>
  );
}
