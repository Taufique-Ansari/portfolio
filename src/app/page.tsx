import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Participation } from "@/components/sections/Participation";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Participation />
      <Contact />
      <Footer />
    </main>
  );
}
