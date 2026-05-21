"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">LearnHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/">
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              size="sm"
              className="h-9"
            >
              Beranda
            </Button>
          </Link>
          <Link href="/materi">
            <Button
              variant={isActive("/materi") || pathname.startsWith("/materi/") ? "secondary" : "ghost"}
              size="sm"
              className="h-9"
            >
              Materi
            </Button>
          </Link>
          <Link href="/panduan">
            <Button
              variant={isActive("/panduan") ? "secondary" : "ghost"}
              size="sm"
              className="h-9"
            >
              Panduan
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-b border-border/40 bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Beranda
            </Button>
          </Link>
          <Link href="/materi" onClick={() => setMobileMenuOpen(false)}>
            <Button
              variant={isActive("/materi") || pathname.startsWith("/materi/") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Materi
            </Button>
          </Link>
          <Link href="/panduan" onClick={() => setMobileMenuOpen(false)}>
            <Button
              variant={isActive("/panduan") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              Panduan
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
