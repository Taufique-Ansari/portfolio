import { SOCIALS } from '@/content/data'
import './hero.css'

// Sticky hero: red aurora canvas behind, tagline + social/nav bar in front.
export default function Hero() {
  return (
    <div className="scroll-wrap" id="scroll-wrap">
      <section className="hero" id="hero">
        <h1 className="sr-only">
          Taufique Ansari — Full Stack Engineer, specialized in web development, backend and
          production-grade systems.
        </h1>
        <div className="hero-canvas" id="hero-canvas" />

        <div className="hero-content">
          <div className="hero-tagline" id="hero-tagline">
            Quiet creator, <span className="other-accent">I bring ideas to life</span>,
            <br />
            between motion, detail and softness.
          </div>

          <div className="hero-line" id="hero-line" />
          <div className="hero-bar" id="hero-bar">
            <div className="hero-bar-left">
              <span className="chr-hover" data-chr="V1.0" />
            </div>
            <nav className="hero-bar-center" aria-label="Social links">
              <a className="chr-hover" data-chr="LeetCode" href={SOCIALS.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" />
              <span className="sep" aria-hidden="true">/</span>
              <a className="chr-hover" data-chr="LinkedIn" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" />
              <span className="sep" aria-hidden="true">/</span>
              <a className="chr-hover" data-chr="GitHub" href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" />
            </nav>
            <nav className="hero-bar-right" aria-label="Main navigation">
              <a className="chr-hover" data-chr="Work" href="#" data-page-link="work" aria-label="Work" />
              <a className="chr-hover" data-chr="Info" href="#" data-page-link="info" aria-label="Info" />
              <a className="chr-hover" data-chr="Contact" href="#" data-page-link="contact" aria-label="Contact" />
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
