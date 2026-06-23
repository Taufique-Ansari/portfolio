import { SOCIALS } from '@/content/data'
import './footer.css'

// Footer: ASCII-art panels (engine-generated, hover-interactive) + the giant name that
// staggers up. The footer-transition drives the contact/footer handoff.
export default function Footer() {
  return (
    <>
      <div className="footer-transition" id="footer-transition" />
      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <a className="chr-hover footer-mail" data-chr-footer={SOCIALS.email} href={`mailto:${SOCIALS.email}`} aria-label="Send an email" />
              <span className="chr-hover footer-date" data-chr-footer="© 2026" />
            </div>
            <nav className="footer-top-col" aria-label="Social links">
              <a className="chr-hover" data-chr-footer="GitHub" href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" />
              <a className="chr-hover" data-chr-footer="LinkedIn" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" />
              <a className="chr-hover" data-chr-footer="LeetCode" href={SOCIALS.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" />
            </nav>
            <nav className="footer-top-col" aria-label="Footer navigation">
              <a className="chr-hover" data-chr-footer="Work" href="#" data-page-link="work" aria-label="Work" />
              <a className="chr-hover" data-chr-footer="Info" href="#" data-page-link="info" aria-label="Info" />
              <a className="chr-hover" data-chr-footer="Contact" href="#" data-page-link="contact" aria-label="Contact" />
            </nav>
          </div>
          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left" />
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right" />
            </div>
          </div>
          <div className="footer-name">
            <span className="footer-name-luke">
              <span className="first-letter">T</span>aufique
            </span>
            <span className="footer-name-baffait-wrap">
              <span className="footer-name-baffait">Ansari</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
