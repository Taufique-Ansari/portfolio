import ArrowGlyph from '@/shared/ArrowGlyph'
import { SKILL_GROUPS } from '@/content/data'
import './skills.css'

// Skills: sticky left intro + accordion groups + the sliding red arrow.
export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-inner">
        <div className="skills-left">
          <div className="skills-subtitle">Skills</div>
          <div className="skills-text">
            Full stack engineer at Cognizant, passionate about web development, backend and
            production-grade systems.
          </div>
          <div className="skills-separator" />
          <div>
            <a className="skills-contact chr-hover" data-chr="Contact me" href="#" data-page-link="contact" aria-label="Contact me" />
          </div>
          <div className="skills-arrow" id="skills-arrow">
            <ArrowGlyph />
          </div>
        </div>
        <div className="skills-right" id="skills-right">
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.group} className={`skill-group${i === 0 ? ' open' : ''}`} data-group={g.group}>
              <div className="skill-header">
                <span className="skill-header-title">{g.title}</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
