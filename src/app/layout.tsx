import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Log File Filterer.",
  description: "This project belongs to Spyke Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
