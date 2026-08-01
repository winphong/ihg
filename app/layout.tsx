import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const theNextFont = localFont({
  src: "./fonts/TheNextFont.ttf",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Inter-Hall Games",
  description: "NUS Inter-Hall Games official website",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${theNextFont.variable} h-full antialiased`}
    >
      <body className="bg-ihg-bg flex min-h-full flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
