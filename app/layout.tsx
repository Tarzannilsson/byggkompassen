import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byggkompassen — Hitta rätt program för ditt byggföretag",
  description:
    "Oberoende jämförelse av program och tjänster för svenska byggföretag. Slipp säljtjatet — hitta rätt verktyg i lugn och ro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
          <p>
            Byggkompassen är oberoende — vi tar inte betalt för placeringar och
            vi säljer inte dina uppgifter.
          </p>
        </footer>
      </body>
    </html>
  );
}
