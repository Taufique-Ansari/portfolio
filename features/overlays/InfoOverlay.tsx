import { INFO, SKILL_GROUPS, SOCIALS } from '@/content/data'
import { mock } from '@/shared/placeholder'
import './overlays.css'
import profileImg from '@/public/assests/images/self/me.png'
// In-page "Info" overlay — about + skills, over the aurora shader.
export default function InfoOverlay() {
  return (
    <section className="page-overlay" id="page-info" aria-hidden="true">
      <div className="page-aurora" id="page-info-aurora" />
      <span className="page-back chr-hover" data-chr="Back" data-page-close role="button" tabIndex={0} aria-label="Back" />
      <div className="page-overlay-title">Info</div>

      <div className="page-cols" data-lenis-prevent>
        <div className="pc-left">
          <div className="info-photo">
            <img src={profileImg.src} alt="Taufique Ansari" decoding="async" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>
          <div className="pc-meta">
            <div className="meta-row">
              <span className="meta-k">Based in</span>
              <span className="meta-v">{INFO.basedIn}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Status</span>
              <span className="meta-v">{INFO.status}</span>
            </div>
          </div>
          <a className="pc-email" href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a>
        </div>

        <div className="pc-right">
          <div className="pc-label">About</div>
          <h2 className="pc-heading">{INFO.heading}</h2>
          <p className="pc-lead">{INFO.lead}</p>
          <p className="pc-body">{INFO.body}</p>

          <div className="pc-grid">
            {SKILL_GROUPS.map((g) => (
              <div className="pc-col" key={g.group}>
                <div className="pc-col-h">{g.title}</div>
                {g.items.map((it) => (
                  <div className="pc-col-item" key={it}>{it}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
