import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nyala Bersama — Pulihkan Harapan",
  description: "Gerakan gotong royong untuk membantu warga terdampak bencana di Indonesia.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}