import Preloader from '@/features/preloader/Preloader'
import Hero from '@/features/hero/Hero'
import Reveal from '@/features/reveal/Reveal'
import About from '@/features/about/About'
import Projects from '@/features/projects/Projects'
import Gallery from '@/features/gallery/Gallery'
import Skills from '@/features/skills/Skills'
import Contact from '@/features/contact/Contact'
import Footer from '@/features/footer/Footer'
import ScrollUI from '@/features/scroll-ui/ScrollUI'
import Overlays from '@/features/overlays/Overlays'
import WorkOverlay from '@/features/overlays/WorkOverlay'
import InfoOverlay from '@/features/overlays/InfoOverlay'
import ContactOverlay from '@/features/overlays/ContactOverlay'
import PortfolioEngine from './components/PortfolioEngine'

// Server component: composes each feature's markup. The single client island,
// <PortfolioEngine>, boots the GSAP/Lenis animations against this DOM.
export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Reveal />

      <section className="section-after" id="section-after">
        <About />
        <Projects />
      </section>

      <Gallery />
      <Skills />
      <Contact />
      <Footer />

      <Overlays />
      <ScrollUI />

      <WorkOverlay />
      <InfoOverlay />
      <ContactOverlay />

      <PortfolioEngine />
    </>
  )
}
