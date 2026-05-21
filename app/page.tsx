import { SubjectCard } from "@/components/subject-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { MateriIndex } from "@/types/materi";

async function getSubjects(): Promise<MateriIndex> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";
  
  try {
    const res = await fetch(`${baseUrl}/data/index.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    // Fallback to reading directly
    const data = await import("@/public/data/index.json");
    return data.default as MateriIndex;
  }
}

export default async function HomePage() {
  let subjects: MateriIndex = { subjects: [] };
  
  try {
    subjects = await getSubjects();
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Platform Pembelajaran Interaktif</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Belajar Lebih Mudah dengan{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LearnHub
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Akses berbagai materi pembelajaran dengan mudah. Tambahkan materi baru kapan saja 
              dengan format JSON yang fleksibel dan mudah dikustomisasi.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/materi">
                <Button size="lg" className="gap-2">
                  Mulai Belajar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/panduan">
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Lihat Panduan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border/40 bg-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Mudah Ditambahkan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tambahkan materi baru hanya dengan menambahkan file JSON ke folder data.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Desain Modern</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tampilan elegan dengan dukungan dark mode untuk kenyamanan membaca.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Media Lengkap</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mendukung gambar dan video untuk pengalaman belajar yang lebih kaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Materi Pembelajaran
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Pilih materi yang ingin Anda pelajari dari koleksi materi yang tersedia.
            </p>
          </div>

          {subjects.subjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  title={subject.title}
                  description={subject.description}
                  icon={subject.icon}
                  color={subject.color}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-semibold">Belum Ada Materi</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tambahkan materi dengan menambahkan file JSON ke folder <code className="rounded bg-muted px-1.5 py-0.5">/public/data/</code>
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/materi">
              <Button variant="outline" size="lg" className="gap-2">
                Lihat Semua Materi
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
