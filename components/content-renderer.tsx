"use client";

import { MediaItem } from "@/types/materi";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ContentRendererProps {
  content: string;
  media?: MediaItem[];
}

function ImageWithFallback({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <figure className="space-y-3">
        <div className="flex aspect-video w-full items-center justify-center bg-muted">
          <div className="text-center p-8">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              Gambar: {alt || caption || src}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              (Letakkan gambar di {src})
            </p>
          </div>
        </div>
        {caption && (
          <figcaption className="px-4 pb-4 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || caption || "Image"}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      </div>
      {caption && (
        <figcaption className="px-4 pb-4 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ContentRenderer({ content, media }: ContentRendererProps) {
  return (
    <div className="space-y-6">
      {/* Main Content */}
      <div 
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Media Items */}
      {media && media.length > 0 && (
        <div className="space-y-6">
          {media.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-border bg-muted/30">
              {item.type === "image" ? (
                <ImageWithFallback
                  src={item.url}
                  alt={item.alt || item.caption || "Image"}
                  caption={item.caption}
                />
              ) : item.type === "video" ? (
                <figure className="space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <iframe
                      src={item.url}
                      title={item.caption || "Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="px-4 pb-4 text-center text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

