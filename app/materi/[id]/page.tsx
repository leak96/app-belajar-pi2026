"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentRenderer } from "@/components/content-renderer";
import { SectionNav } from "@/components/section-nav";
import { Materi, ContentSection } from "@/types/materi";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Flag, 
  Globe, 
  Menu, 
  Target, 
  User, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Flag,
  Globe,
  Target,
};

export default function MateriDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [materi, setMateri] = useState<Materi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadMateri() {
      try {
        const res = await fetch(`/data/${id}.json`);
        if (!res.ok) throw new Error("Materi tidak ditemukan");
        const data = await res.json();
        setMateri(data);
        if (data.sections && data.sections.length > 0) {
          setActiveSection(data.sections[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    loadMateri();
  }, [id]);

  const currentSectionIndex = materi?.sections.findIndex(s => s.id === activeSection) ?? 0;
  const currentSection = materi?.sections[currentSectionIndex];
  const prevSection = currentSectionIndex > 0 ? materi?.sections[currentSectionIndex - 1] : null;
  const nextSection = materi?.sections && currentSectionIndex < materi.sections.length - 1 
    ? materi.sections[currentSectionIndex + 1] 
    : null;

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Memuat materi...</p>
        </div>
      </div>
    );
  }

  if (error || !materi) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Card className="p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">Materi Tidak Ditemukan</h2>
          <p className="mt-2 text-muted-foreground">{error || "Materi yang Anda cari tidak tersedia."}</p>
          <Link href="/materi" className="mt-6 inline-block">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar Materi
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const IconComponent = iconMap[materi.icon] || BookOpen;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={cn("border-b border-border/40 bg-muted/30", materi.color.replace("bg-", "bg-").concat("/5"))}>
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Link href="/materi" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Materi
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl", materi.color)}>
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{materi.title}</h1>
                <p className="mt-2 text-muted-foreground">{materi.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {materi.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{materi.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(materi.lastUpdated).toLocaleDateString("id-ID", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}</span>
              </div>
            </div>
          </div>

          {materi.tags && materi.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {materi.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Sidebar */}
          <aside className={cn(
            "fixed inset-y-0 left-0 z-30 w-72 border-r border-border bg-background p-6 pt-24 transition-transform lg:relative lg:inset-auto lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-none lg:bg-transparent lg:p-0 lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="sticky top-24">
              <SectionNav
                sections={materi.sections}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </aside>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <Card className="overflow-hidden border-border/50 p-6 sm:p-8">
              {currentSection && (
                <>
                  <h2 className="mb-6 text-2xl font-bold">{currentSection.title}</h2>
                  <ContentRenderer 
                    content={currentSection.content} 
                    media={currentSection.media} 
                  />
                </>
              )}
            </Card>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {prevSection ? (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleSectionChange(prevSection.id)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{prevSection.title}</span>
                  <span className="sm:hidden">Sebelumnya</span>
                </Button>
              ) : (
                <div />
              )}

              <span className="text-sm text-muted-foreground">
                {currentSectionIndex + 1} / {materi.sections.length}
              </span>

              {nextSection ? (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleSectionChange(nextSection.id)}
                >
                  <span className="hidden sm:inline">{nextSection.title}</span>
                  <span className="sm:hidden">Selanjutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
