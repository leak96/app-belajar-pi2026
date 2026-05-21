import Link from "next/link";
import { BookOpen, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">LearnHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform pembelajaran untuk mempelajari berbagai materi dengan mudah dan interaktif.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Menu</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Beranda
              </Link>
              <Link href="/materi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Semua Materi
              </Link>
              <Link href="/panduan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Panduan Penggunaan
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informasi</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Materi dapat ditambahkan dengan menambahkan file JSON ke folder <code className="rounded bg-muted px-1.5 py-0.5 text-xs">/public/data/</code></p>
              <p>Lihat halaman Panduan untuk informasi lebih lanjut.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LearnHub. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
