"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Dict {
  contact: {
    title: string;
    subtitle: string;
    form: {
      title: string;
      name: string;
      email: string;
      phone: string;
      company: string;
      subject: string;
      subjects: Record<string, string>;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
    rfq: {
      title: string;
      subtitle: string;
      product: string;
      quantity: string;
      delivery: string;
      submit: string;
      success: string;
      error: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      sales: string;
      hours: string;
    };
    whatsapp: { text: string };
  };
  products: {
    items: { slug: string; title: string }[];
  };
}

export default function ContactPage() {
  const params = useParams();
  const lang = params?.lang as string;
  const [dict, setDict] = useState<Dict | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [rfqData, setRfqData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "",
    delivery: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "rfq">("contact");

  useEffect(() => {
    if (lang) {
      import(`@/app/dictionaries/${lang}.json`).then((m) => setDict(m.default));
    }
  }, [lang]);

  if (!dict) return null;

  const c = dict.contact;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSuccess(true);
    setRfqData({ name: "", email: "", phone: "", company: "", product: "", quantity: "", delivery: "", message: "" });
  };

  return (
    <>
      <Section className="pb-0 pt-24 md:pt-32">
        <Container className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
            {c.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {c.subtitle}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8 flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("contact")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "bg-forest text-white"
                  : "bg-cream-dark text-charcoal hover:bg-forest/20 dark:bg-charcoal-light dark:text-zinc-300"
              }`}
            >
              {c.form.title}
            </button>
            <button
              onClick={() => setActiveTab("rfq")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "rfq"
                  ? "bg-forest text-white"
                  : "bg-cream-dark text-charcoal hover:bg-forest/20 dark:bg-charcoal-light dark:text-zinc-300"
              }`}
            >
              {c.rfq.title}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeTab === "contact" ? (
                <Card>
                  {formSuccess ? (
                    <div className="rounded-xl bg-forest/10 p-6 text-center text-forest dark:bg-forest/20 dark:text-forest-light">
                      {c.form.success}
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label={c.form.name}
                          value={formData.name}
                          onChange={(v) => setFormData({ ...formData, name: v })}
                          required
                        />
                        <Input
                          label={c.form.email}
                          type="email"
                          value={formData.email}
                          onChange={(v) => setFormData({ ...formData, email: v })}
                          required
                        />
                        <Input
                          label={c.form.phone}
                          type="tel"
                          value={formData.phone}
                          onChange={(v) => setFormData({ ...formData, phone: v })}
                        />
                        <Input
                          label={c.form.company}
                          value={formData.company}
                          onChange={(v) => setFormData({ ...formData, company: v })}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-charcoal dark:text-zinc-200">
                          {c.form.subject}
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-forest dark:border-zinc-700 dark:bg-charcoal-light dark:text-zinc-100"
                          required
                        >
                          <option value="">--</option>
                          {Object.entries(c.form.subjects).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-charcoal dark:text-zinc-200">
                          {c.form.message}
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-forest dark:border-zinc-700 dark:bg-charcoal-light dark:text-zinc-100"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-light"
                      >
                        {c.form.submit}
                      </button>
                    </form>
                  )}
                </Card>
              ) : (
                <Card>
                  {rfqSuccess ? (
                    <div className="rounded-xl bg-forest/10 p-6 text-center text-forest dark:bg-forest/20 dark:text-forest-light">
                      {c.rfq.success}
                    </div>
                  ) : (
                    <form onSubmit={handleRfqSubmit} className="space-y-4">
                      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {c.rfq.subtitle}
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label={c.form.name}
                          value={rfqData.name}
                          onChange={(v) => setRfqData({ ...rfqData, name: v })}
                          required
                        />
                        <Input
                          label={c.form.email}
                          type="email"
                          value={rfqData.email}
                          onChange={(v) => setRfqData({ ...rfqData, email: v })}
                          required
                        />
                        <Input
                          label={c.form.phone}
                          type="tel"
                          value={rfqData.phone}
                          onChange={(v) => setRfqData({ ...rfqData, phone: v })}
                          required
                        />
                        <Input
                          label={c.form.company}
                          value={rfqData.company}
                          onChange={(v) => setRfqData({ ...rfqData, company: v })}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-charcoal dark:text-zinc-200">
                            {c.rfq.product}
                          </label>
                          <select
                            value={rfqData.product}
                            onChange={(e) => setRfqData({ ...rfqData, product: e.target.value })}
                            className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest dark:border-zinc-700 dark:bg-charcoal-light dark:text-zinc-100"
                            required
                          >
                            <option value="">--</option>
                            {dict.products.items.map((p) => (
                              <option key={p.slug} value={p.slug}>
                                {p.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Input
                          label={c.rfq.quantity}
                          type="number"
                          value={rfqData.quantity}
                          onChange={(v) => setRfqData({ ...rfqData, quantity: v })}
                          required
                        />
                        <Input
                          label={c.rfq.delivery}
                          value={rfqData.delivery}
                          onChange={(v) => setRfqData({ ...rfqData, delivery: v })}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-charcoal dark:text-zinc-200">
                          {c.form.message}
                        </label>
                        <textarea
                          value={rfqData.message}
                          onChange={(e) => setRfqData({ ...rfqData, message: e.target.value })}
                          rows={3}
                          className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest dark:border-zinc-700 dark:bg-charcoal-light dark:text-zinc-100"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-light"
                      >
                        {c.rfq.submit}
                      </button>
                    </form>
                  )}
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="mb-3 font-semibold text-charcoal dark:text-zinc-100">Info</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs text-zinc-400">Alamat</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{c.info.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Phone</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{c.info.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Email</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{c.info.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Sales</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{c.info.sales}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Jam Kerja</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{c.info.hours}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="mb-3 font-semibold text-charcoal dark:text-zinc-100">Lokasi</h3>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-forest/20 to-coffee/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d110.3584085!3d-7.0459936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708baf5fb60ba7%3A0x6ee6fee520aa158!2sMusholla%20An-nur!5e0!3m2!1sen!2sid!4v1720000000000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EcoBrew Location"
                  />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-charcoal dark:text-zinc-200">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-forest dark:border-zinc-700 dark:bg-charcoal-light dark:text-zinc-100"
        required={required}
      />
    </div>
  );
}
