import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, FileJson, FolderOpen, Image, Video } from "lucide-react";

export const metadata = {
  title: "Panduan Penggunaan - LearnHub",
  description: "Panduan lengkap cara menambahkan materi baru ke LearnHub",
};

export default function PanduanPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-primary">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Panduan Penggunaan
            </h1>
          </div>
          <p className="mt-4 text-muted-foreground">
            Pelajari cara menambahkan materi baru ke aplikasi LearnHub dengan mudah menggunakan format JSON.
          </p>
        </div>

        {/* Structure Overview */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FolderOpen className="h-6 w-6 text-primary" />
                <CardTitle>Struktur Folder</CardTitle>
              </div>
              <CardDescription>
                Semua file materi disimpan di folder <code className="rounded bg-muted px-1.5 py-0.5">/public/data/</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
{`public/
├── data/
│   ├── index.json          # Daftar semua materi
│   ├── bahasa-indonesia.json
│   ├── wawasan-kebangsaan.json
│   ├── tata-naskah.json
│   ├── bahasa-inggris.json
│   └── renstra.json
└── images/
    └── sample/             # Folder untuk gambar materi
        └── *.jpg`}
              </pre>
            </CardContent>
          </Card>

          {/* Index.json */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileJson className="h-6 w-6 text-primary" />
                <CardTitle>File index.json</CardTitle>
              </div>
              <CardDescription>
                File ini berisi daftar semua materi yang tersedia. Tambahkan entry baru saat menambah materi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
{`{
  "subjects": [
    {
      "id": "nama-materi",           // ID unik (gunakan kebab-case)
      "title": "Nama Materi",        // Judul yang ditampilkan
      "description": "Deskripsi singkat materi",
      "icon": "BookOpen",            // Nama icon dari Lucide
      "color": "bg-blue-500",        // Warna Tailwind CSS
      "file": "/data/nama-materi.json"
    }
  ]
}`}
              </pre>
              <div className="mt-4">
                <p className="text-sm font-medium">Icon yang tersedia:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["BookOpen", "FileText", "Flag", "Globe", "Target"].map((icon) => (
                    <Badge key={icon} variant="outline">{icon}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materi JSON Structure */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Struktur File Materi JSON</CardTitle>
              </div>
              <CardDescription>
                Setiap materi memiliki struktur JSON seperti berikut:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
{`{
  "id": "nama-materi",
  "title": "Judul Materi",
  "description": "Deskripsi lengkap materi",
  "icon": "BookOpen",
  "color": "bg-blue-500",
  "lastUpdated": "2024-01-15",
  "author": "Nama Penulis",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "sections": [
    {
      "id": "section-1",
      "title": "Judul Bagian 1",
      "content": "<h2>Heading</h2><p>Konten HTML...</p>",
      "media": [
        {
          "type": "image",
          "url": "/images/sample/gambar.jpg",
          "caption": "Keterangan gambar",
          "alt": "Teks alternatif"
        },
        {
          "type": "video",
          "url": "https://www.youtube.com/embed/VIDEO_ID",
          "caption": "Keterangan video"
        }
      ]
    }
  ]
}`}
              </pre>
            </CardContent>
          </Card>

          {/* Media Guidelines */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Image className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Gambar</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Untuk menambahkan gambar:
                </p>
                <ol className="list-inside list-decimal space-y-2 text-sm">
                  <li>Simpan gambar di folder <code className="rounded bg-muted px-1">/public/images/</code></li>
                  <li>Referensikan dengan path relatif: <code className="rounded bg-muted px-1">/images/nama-gambar.jpg</code></li>
                  <li>Format yang didukung: JPG, PNG, WebP, GIF</li>
                </ol>
                <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
{`{
  "type": "image",
  "url": "/images/sample/gambar.jpg",
  "caption": "Keterangan gambar",
  "alt": "Deskripsi untuk aksesibilitas"
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Video className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Video</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Untuk menambahkan video YouTube:
                </p>
                <ol className="list-inside list-decimal space-y-2 text-sm">
                  <li>Ambil ID video dari URL YouTube</li>
                  <li>Gunakan format embed: <code className="rounded bg-muted px-1">youtube.com/embed/ID</code></li>
                  <li>Video akan ditampilkan responsif</li>
                </ol>
                <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
{`{
  "type": "video",
  "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "caption": "Tutorial lengkap"
}`}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* HTML Content */}
          <Card>
            <CardHeader>
              <CardTitle>Tag HTML yang Didukung dalam Content</CardTitle>
              <CardDescription>
                Gunakan tag HTML berikut dalam field &quot;content&quot; untuk memformat teks:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Heading & Paragraf</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code>&lt;h2&gt;</code> - Heading level 2</li>
                    <li><code>&lt;h3&gt;</code> - Heading level 3</li>
                    <li><code>&lt;p&gt;</code> - Paragraf</li>
                    <li><code>&lt;blockquote&gt;</code> - Kutipan</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">List</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code>&lt;ul&gt;&lt;li&gt;</code> - Unordered list</li>
                    <li><code>&lt;ol&gt;&lt;li&gt;</code> - Ordered list</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Format Teks</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code>&lt;strong&gt;</code> - Teks tebal</li>
                    <li><code>&lt;em&gt;</code> - Teks miring</li>
                    <li><code>&lt;code&gt;</code> - Inline code</li>
                    <li><code>&lt;a href=&quot;&quot;&gt;</code> - Link</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tabel</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code>&lt;table&gt;</code> - Tabel</li>
                    <li><code>&lt;thead&gt;&lt;tr&gt;&lt;th&gt;</code> - Header</li>
                    <li><code>&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;</code> - Body</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Langkah Cepat Menambah Materi Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-inside list-decimal space-y-3 text-sm">
                <li>
                  <strong>Buat file JSON baru</strong> di folder <code className="rounded bg-muted px-1">/public/data/</code>
                  <br />
                  <span className="text-muted-foreground">Contoh: <code className="rounded bg-muted px-1">materi-baru.json</code></span>
                </li>
                <li>
                  <strong>Salin struktur JSON</strong> dari contoh di atas dan sesuaikan isinya
                </li>
                <li>
                  <strong>Tambahkan entry</strong> ke file <code className="rounded bg-muted px-1">index.json</code>
                </li>
                <li>
                  <strong>Simpan gambar</strong> (jika ada) ke folder <code className="rounded bg-muted px-1">/public/images/</code>
                </li>
                <li>
                  <strong>Deploy ulang</strong> atau refresh aplikasi untuk melihat perubahan
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
