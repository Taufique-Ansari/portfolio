import { CONTACT, SOCIALS } from '@/content/data'
import './overlays.css'

// In-page "Contact" overlay — call to action + shortcuts, over the aurora shader.
export default function ContactOverlay() {
  return (
    <section className="page-overlay" id="page-contact" aria-hidden="true">
      <div className="page-aurora" id="page-contact-aurora" />
      <span className="page-back chr-hover" data-chr="Back" data-page-close role="button" tabIndex={0} aria-label="Back" />
      <div className="page-overlay-title">Contact</div>

      <div className="page-cols" data-lenis-prevent>
        <div className="pc-left">
          <div className="pc-card">
            <div className="pc-card-title">{CONTACT.cardTitle}</div>
            <div className="pc-card-body">{CONTACT.cardBody}</div>
          </div>
          <div className="pc-meta">
            <div className="meta-row">
              <span className="meta-k">Based in</span>
              <span className="meta-v">{CONTACT.basedIn}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Status</span>
              <span className="meta-v">{CONTACT.status}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Avg. response</span>
              <span className="meta-v">{CONTACT.response}</span>
            </div>
          </div>
          <a className="pc-email" href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a>
        </div>

        <div className="pc-right">
          <div className="pc-label">Contact</div>
          <h2 className="pc-heading">{CONTACT.heading}</h2>
          <p className="pc-lead">{CONTACT.lead}</p>
          <p className="pc-body">{CONTACT.body}</p>

          <div className="pc-grid">
            <div className="pc-col">
              <div className="pc-col-h">Shortcuts</div>
              <a className="pc-col-item" style={{ display: 'block', textDecoration: 'none' }} href={`mailto:${SOCIALS.email}`}>Direct mail</a>
              <a className="pc-col-item" style={{ display: 'block', textDecoration: 'none' }} href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="pc-col-item" style={{ display: 'block', textDecoration: 'none' }} href={SOCIALS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="pc-col-item" style={{ display: 'block', textDecoration: 'none' }} href={SOCIALS.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
            <div className="pc-col">
              <div className="pc-col-h">Brief format</div>
              {CONTACT.brief.map((b) => (
                <div className="pc-col-item" key={b}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
