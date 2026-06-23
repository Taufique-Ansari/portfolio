// Segmented scroll timeline + percentage indicator (right/left rails).
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroll } from '@/shared/smooth-scroll'
import { isMobileViewport } from '@/shared/env'

export function initScrollUI() {
  const timeline = document.getElementById('scroll-timeline')
  const bar = document.getElementById('st-bar')
  const label = document.getElementById('st-label')
  const pctEl = document.getElementById('scroll-pct')

  const sections = [
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'circle-gallery', name: 'Gallery' },
    { id: 'skills', name: 'Skills' },
    { id: 'contact', name: 'Contact' },
  ].filter((sec) => !(sec.id === 'circle-gallery' && isMobileViewport()))

  const scrollY0 = window.scrollY || window.pageYOffset
  const zoneTop = document.getElementById(sections[0].id).getBoundingClientRect().top + scrollY0
  const lastEl = document.getElementById(sections[sections.length - 1].id)
  const zoneBottom = lastEl.getBoundingClientRect().top + lastEl.offsetHeight + scrollY0
  const zoneH = zoneBottom - zoneTop

  const segEls = []
  sections.forEach((sec) => {
    const el = document.getElementById(sec.id)
    sec.ratio = el.offsetHeight / zoneH
    const seg = document.createElement('div')
    seg.className = 'st-seg'
    seg.style.flex = sec.ratio.toFixed(4)
    seg.title = sec.name
    const fill = document.createElement('div')
    fill.className = 'st-seg-fill'
    seg.appendChild(fill)
    bar.appendChild(seg)
    seg.addEventListener('click', (function (targetId) {
      return function () {
        const target = document.getElementById(targetId)
        if (!target) return
        const lenis = scroll.lenis
        if (lenis && lenis.scrollTo) lenis.scrollTo(target, { offset: 0, duration: 1.2 })
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })(sec.id))
    segEls.push({ seg, fill })
  })

  ScrollTrigger.create({
    trigger: '#' + sections[0].id, start: 'top bottom',
    endTrigger: '#' + sections[sections.length - 1].id, end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pageP = docH > 0 ? Math.round((window.scrollY / docH) * 100) : 0
      pctEl.textContent = '(' + pageP + ')'

      if (progress <= 0 || progress >= 0.90) {
        timeline.classList.remove('visible')
        pctEl.classList.remove('visible')
        timeline.style.opacity = ''
        pctEl.style.opacity = ''
        return
      }
      timeline.classList.add('visible')
      pctEl.classList.add('visible')

      let activeIdx = 0
      let cumul = 0
      for (let i = 0; i < sections.length; i++) {
        const segStart = cumul
        const segEnd = cumul + sections[i].ratio
        if (progress < segEnd) {
          const inner = (progress - segStart) / sections[i].ratio
          segEls[i].fill.style.height = (Math.min(1, Math.max(0, inner)) * 100).toFixed(1) + '%'
          activeIdx = i
          for (let j = i + 1; j < sections.length; j++) segEls[j].fill.style.height = '0%'
          break
        } else {
          segEls[i].fill.style.height = '100%'
        }
        cumul = segEnd
      }
      label.textContent = sections[activeIdx].name
      label.style.top = (progress * 100).toFixed(1) + '%'
    },
  })
}
