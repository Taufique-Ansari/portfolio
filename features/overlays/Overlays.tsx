import { PROJECTS } from '@/content/data'
import { mock } from '@/shared/placeholder'
import './overlays.css'

// Floating layers driven entirely by the engine: the project preview card +
// "See project" cursor, the page-fade / flying-title transition layers, and the
// full-screen project-detail view.
export default function Overlays() {
  return (
    <>
      <div className="proj-preview" id="proj-preview">
        <div className="proj-card" id="proj-card">
          <div className="proj-meta">
            <span className="proj-date" id="proj-date">01 2025</span>
            <span className="proj-label">Preview</span>
          </div>
          <img id="proj-cover" src={mock(PROJECTS[0].id, 1500, 1000)} alt="" width={1333} height={1000} />
        </div>
      </div>
      <div className="proj-cursor" id="proj-cursor">See project</div>

      <div className="page-fade" id="page-fade" />
      <div className="flying-title" id="flying-title" />
      <div className="work-transition-overlay" id="work-transition-overlay" />
      <div className="work-flying-text" id="work-flying-text">Work</div>

      <section className="project-detail" id="project-detail">
        <div className="detail-back chr-hover" id="detail-back" data-chr="Return" />
        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap">
            <h1 className="detail-title" id="detail-title" />
            <span className="detail-year" id="detail-year" />
          </div>
          <p className="detail-desc" id="detail-desc" />
          <div className="detail-tags" id="detail-tags" />
        </div>
        <div className="detail-gallery-wrap" id="detail-gallery-wrap">
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner" />
          </div>
          <div className="detail-selected" id="detail-selected" />
        </div>
      </section>
    </>
  )
}
