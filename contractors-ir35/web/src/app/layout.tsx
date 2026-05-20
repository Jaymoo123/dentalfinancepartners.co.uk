import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contractor Finance Partners",
  description: "UK accountants for contractors, IR35 specialists, and limited company directors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
