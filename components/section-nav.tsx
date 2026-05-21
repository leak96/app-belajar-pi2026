"use client";

import { cn } from "@/lib/utils";
import { ContentSection } from "@/types/materi";

interface SectionNavProps {
  sections: ContentSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SectionNav({ sections, activeSection, onSectionChange }: SectionNavProps) {
  return (
    <nav className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Daftar Isi
      </p>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
            activeSection === section.id
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
