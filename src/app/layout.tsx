import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Menu Demo",
  description: "A demo application showcasing Next.js with Redis caching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark"}>
        <Navbar />
        {children}
        <footer className="bg-surface dark:bg-surface-dark shadow-inner mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-text-secondary dark:text-text-secondary-dark">
              © {new Date().getFullYear()} Restaurant Menu Demo. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
