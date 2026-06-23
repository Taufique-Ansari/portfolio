import ArrowGlyph from '@/shared/ArrowGlyph'
import { mock } from '@/shared/placeholder'
import './about.css'
import profileImg from '@/public/assests/images/self/me.png'

// About block (lives inside #section-after). Text reveals word-by-word; the portrait
// parallaxes. The engine wraps the words.
export default function About() {
  return (
    <div className="about" id="about">
      <div className="about-text" id="about-text">
        As a<span className="other-accent"> full stack engineer</span>, I build tailor-made web and
        backend systems, blending technical precision and{' '}
        <span className="other-accent">care</span>.
      </div>
      <div className="about-sub" id="about-sub">
        My name is Taufique. A passionate developer, I build production-grade systems end-to-end and
        memorable digital experiences, always chasing the balance between engineering and craft.
      </div>
      <div className="about-btn">
        <a className="chr-hover" data-chr="Info" href="#" data-page-link="info" aria-label="More about me" />
      </div>
      <div className="about-version">
        <ArrowGlyph />V1.0
      </div>
      <div className="about-photo-wrap" id="about-photo-wrap">
        <img className="about-photo" src={profileImg.src} alt="Taufique Ansari" decoding="async" width={2500} height={3001} />
      </div>
    </div>
  )
}
