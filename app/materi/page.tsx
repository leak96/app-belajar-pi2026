import { SubjectCard } from "@/components/subject-card";
import { BookOpen, Search } from "lucide-react";
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
    const data = await import("@/public/data/index.json");
    return data.default as MateriIndex;
  }
}

export const metadata = {
  title: "Semua Materi - LearnHub",
  description: "Jelajahi semua materi pembelajaran yang tersedia di LearnHub",
};

export default async function MateriPage() {
  let subjects: MateriIndex = { subjects: [] };
  
  try {
    subjects = await getSubjects();
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }

  return (
    <div className="py-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-primary">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Semua Materi
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Pilih materi yang ingin Anda pelajari. Setiap materi dilengkapi dengan 
            ringkasan lengkap, gambar, dan video pendukung.
          </p>
        </div>

        {/* Search Info */}
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 p-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <strong>{subjects.subjects.length}</strong> materi tersedia untuk dipelajari
          </p>
        </div>

        {/* Subjects Grid */}
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
              Tambahkan materi dengan menambahkan file JSON ke folder{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">/public/data/</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
