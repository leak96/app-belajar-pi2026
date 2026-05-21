"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FileText, Flag, Globe, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Flag,
  Globe,
  Target,
};

interface SubjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export function SubjectCard({ id, title, description, icon, color }: SubjectCardProps) {
  const IconComponent = iconMap[icon] || BookOpen;

  return (
    <Link href={`/materi/${id}`}>
      <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
        <div className={cn("absolute inset-x-0 top-0 h-1", color)} />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", color, "bg-opacity-10")}>
              <IconComponent className={cn("h-6 w-6", color.replace("bg-", "text-"))} />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
          <CardTitle className="mt-4 text-xl">{title}</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Badge variant="secondary" className="text-xs">
            Pelajari Sekarang
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
