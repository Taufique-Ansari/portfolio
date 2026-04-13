import type { Metadata } from "next";
import { Inter, Doto, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const hedvig = Hedvig_Letters_Serif({
  variable: "--font-hedvig",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${doto.variable} ${hedvig.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
