import { PROJECTS } from '@/content/data'
import { mock } from '@/shared/placeholder'
import './overlays.css'

// In-page "Work" overlay: the 3D project cube (wheel/drag driven by the engine),
// side rulers and a project counter.
export default function WorkOverlay() {
  const faces = PROJECTS.slice(0, 4)
  return (
    <section className="page-overlay" id="page-work" aria-hidden="true">
      <div className="page-aurora" id="page-work-aurora" />
      <span className="page-back chr-hover" data-chr="Back" data-page-close role="button" tabIndex={0} aria-label="Back" />
      <div className="page-overlay-title">Work</div>

      <canvas className="ruler" id="ruler-left" width={160} height={1121} />
      <canvas className="ruler" id="ruler-right" width={160} height={1121} />
      <div className="counter-wrap" id="counter-wrap">
        <div className="counter-window">
          <div className="counter-strip" id="counter-strip">
            {PROJECTS.map((p, i) => (
              <div className="counter-num" key={p.id}>
                <span className="dim">/</span> {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cube-viewport" id="cube-viewport">
        <div className="cube-scene">
          <div className="cube" id="cube">
            {faces.map((p, k) => (
              <div className="cube-face" data-face={k} key={p.id}>
                <div className={`face-content ${k % 2 ? 'layout-right' : 'layout-left'}`} data-lenis-prevent>
                  <div className="face-cover">
                    <div className="face-name">{p.name}</div>
                    <img src={mock(p.id, 1500, 1000)} alt={p.name} decoding="async" />
                  </div>
                  <div className="face-info">
                    <div className="face-info-bg">
                      <img src={mock(p.id, 1500, 1000)} alt="" decoding="async" />
                    </div>
                    <div className="face-info-content">
                      <div className="face-category">{p.category}</div>
                      <div className="face-year">{p.year}</div>
                      <div className="face-desc">{p.desc}</div>
                      <div className="face-tags">
                        {p.tags.map((t) => (
                          <span className="face-tag" key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
