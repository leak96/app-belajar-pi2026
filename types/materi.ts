export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
  alt?: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string; // HTML or markdown content
  media?: MediaItem[];
}

export interface Materi {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  lastUpdated: string;
  author?: string;
  sections: ContentSection[];
  tags?: string[];
}

export interface MateriIndex {
  subjects: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    file: string; // Path to JSON file
  }[];
}
