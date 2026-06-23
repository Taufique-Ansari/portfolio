import { SOCIALS } from '@/content/data'
import './contact.css'

// Contact: the engine reveals a white blob, slides in the title, and floats the framed
// images + availability text up through the pinned section.
export default function Contact() {
  return (
    <>
      <div className="contact-bg" id="contact-bg" />
      <div className="contact-blob-wrap" id="contact-blob-wrap">
        <div className="contact-blob" id="contact-blob" />
      </div>
      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title">Contact</div>

          <div className="contact-dispo" id="contact-dispo">
            <p>
              Open to <span className="other-accent">new opportunities</span>. Eager to join an
              innovative team and contribute to ambitious, production-grade projects.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame">
            <img className="contact-frame-img" id="contact-frame-img" src="/assests/images/art/contact_sec1.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>

          <div className="contact-dispo" id="contact-dispo-2">
            <p>
              I&apos;m available for<span className="other-accent"> freelance work</span> worldwide,
              on<span className="other-accent"> your ambitious projects</span> and international
              collaborations.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame-2">
            <img className="contact-frame-img" id="contact-frame-img-2" src="/assests/images/art/contact_sec2.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" aria-label="Social links">
              <a className="chr-hover" data-chr-contact="GitHub" href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" />
              <a className="chr-hover" data-chr-contact="LinkedIn" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" />
              <a className="chr-hover" data-chr-contact="LeetCode" href={SOCIALS.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" />
            </nav>
            <a className="contact-mail" id="contact-mail" href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a>
          </div>
        </div>
      </section>
    </>
  )
}
