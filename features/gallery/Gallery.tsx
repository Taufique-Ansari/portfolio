import { PROJECTS } from '@/content/data'
import { mock } from '@/shared/placeholder'
import './gallery.css'

// 600vh pinned 3D ring: the engine slices each image into a cylinder and orbits them
// around the phrase as you scroll.
export default function Gallery() {
  return (
    <section className="circle-gallery" id="circle-gallery">
      <div className="circle-gallery-pin" id="circle-gallery-pin">
        {PROJECTS.map((p) => (
          <img key={p.id} className="cg-img" src={mock(p.id, 1500, 1000)} alt={p.name} width={3000} height={2250} />
        ))}
        <p className="cg-phrase" id="cg-phrase">
          Each project is a chance to <span className="other-accent">learn</span>,{' '}
          <span className="other-accent">experiment</span> and push my limits.
        </p>
      </div>
    </section>
  )
}
