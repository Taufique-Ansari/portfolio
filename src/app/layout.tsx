import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taufique Ansari | Full-Stack Developer & Software Engineer",
  description: "Portfolio of Taufique Ansari - A motivated Computer Science graduate and Programmer Analyst Trainee at Cognizant, specializing in Java, Spring Boot, React, and enterprise software development.",
  keywords: ["Taufique Ansari", "Full-Stack Developer", "Software Engineer", "Java Developer", "Spring Boot", "React", "Cognizant", "Portfolio"],
  authors: [{ name: "Taufique Ansari" }],
  openGraph: {
    title: "Taufique Ansari | Full-Stack Developer",
    description: "Full-Stack Developer & Software Engineer specializing in enterprise applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
