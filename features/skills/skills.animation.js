// Skills: single-open accordion + the big red arrow that slides across on scroll.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initSkills() {
  // ---- accordion ----
  const groups = document.querySelectorAll('.skill-group')
  const firstBody = groups[0].querySelector('.skill-body')
  firstBody.style.height = firstBody.scrollHeight + 'px'

  groups.forEach((group) => {
    group.querySelector('.skill-header').addEventListener('click', () => {
      if (group.classList.contains('open')) return
      groups.forEach((g) => {
        if (g.classList.contains('open')) {
          g.classList.remove('open')
          gsap.to(g.querySelector('.skill-body'), { height: 0, duration: 0.45, ease: 'power3.inOut' })
        }
      })
      group.classList.add('open')
      const body = group.querySelector('.skill-body')
      gsap.to(body, {
        height: body.scrollHeight, duration: 0.45, ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      })
    })
  })

  // ---- arrow horizontal travel ----
  const arrow = document.getElementById('skills-arrow')
  if (!arrow) return
  gsap.fromTo(arrow,
    { xPercent: 0 },
    {
      xPercent: 100,
      x: () => {
        const left = arrow.parentElement
        const pad = parseFloat(getComputedStyle(left).paddingLeft) + parseFloat(getComputedStyle(left).paddingRight)
        return left.clientWidth - pad - arrow.offsetWidth
      },
      ease: 'none',
      scrollTrigger: { trigger: '#skills', start: 'top top', endTrigger: '#contact', end: 'top center', scrub: 0.5 },
    })
}
