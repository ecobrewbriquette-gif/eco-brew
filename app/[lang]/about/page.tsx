import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.about.title} – ${dict.site.title}` };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const a = dict.about;

  return (
    <>
      <PageHeader title={a.title} subtitle={a.subtitle} />
      <ProfileSection dict={a.profile} />
      <VisiMisiSection dict={a.visiMisi} />
      <CeritaSection dict={a.cerita} />
      <TeamSection dict={a.tim} />
      <NilaiSection dict={a.nilai} />
    </>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Section className="pb-0 pt-24 md:pt-32">
      <Container className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-forest dark:text-forest-light md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </Container>
    </Section>
  );
}

function ProfileSection({ dict }: { dict: { title: string; description: string } }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-bold text-charcoal dark:text-zinc-100">
            {dict.title}
          </h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {dict.description}
          </p>
        </div>
      </Container>
    </Section>
  );
}

function VisiMisiSection({
  dict,
}: {
  dict: {
    title: string;
    visi: { title: string; content: string };
    misi: string[];
  };
}) {
  return (
    <Section dark>
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold text-cream md:text-4xl">
          {dict.title}
        </h2>
        <div className="mx-auto mb-12 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h3 className="mb-3 text-xl font-semibold text-cream">
            {dict.visi.title}
          </h3>
          <p className="leading-relaxed text-cream/80">{dict.visi.content}</p>
        </div>
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-center text-xl font-semibold text-cream">
            Misi
          </h3>
          <div className="space-y-4">
            {dict.misi.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-light text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-cream/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CeritaSection({ dict }: { dict: { title: string; content: string } }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-forest dark:text-forest-light">
            {dict.title}
          </h2>
          <div className="relative rounded-2xl bg-white p-8 shadow-sm dark:bg-charcoal-light">
            <div className="absolute -left-2 top-8 h-4 w-4 rotate-45 bg-white dark:bg-charcoal-light" />
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.content}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TeamSection({
  dict,
}: {
  dict: {
    title: string;
    members: { name: string; role: string; bio: string; photo: string }[];
  };
}) {
  return (
    <Section dark>
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {dict.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.members.map((member, i) => (
            <Card key={i} className="text-center">
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-forest to-coffee">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-zinc-100">
                {member.name}
              </h3>
              <p className="mb-2 text-sm font-medium text-forest dark:text-forest-light">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {member.bio}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function NilaiSection({
  dict,
}: {
  dict: {
    title: string;
    items: { title: string; description: string }[];
  };
}) {
  return (
    <Section>
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold text-forest dark:text-forest-light md:text-4xl">
          {dict.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.items.map((item, i) => (
            <Card key={i} className="text-center">
              <h3 className="mb-3 text-xl font-semibold text-charcoal dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
