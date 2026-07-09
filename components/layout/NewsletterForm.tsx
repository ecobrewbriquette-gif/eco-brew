"use client";

import { useState } from "react";

export default function NewsletterForm({
  placeholder,
  button,
  successText,
}: {
  placeholder: string;
  button: string;
  successText: string;
}) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
      setEmail("");
    }
  };

  if (success) {
    return (
      <p className="rounded-lg bg-forest/20 px-4 py-3 text-sm text-forest-light">
        {successText}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="rounded-xl bg-zinc-700 px-4 py-2.5 text-sm text-white placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-forest"
      />
      <button
        type="submit"
        className="rounded-xl bg-forest px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-light"
      >
        {button}
      </button>
    </form>
  );
}
