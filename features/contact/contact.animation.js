// Contact: the white blob reveal, the title slide-in, the socials/mail clip reveal,
// and the framed images + availability text floating up through the pinned section.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildDataChr } from '@/shared/text-fx'

export function initContact() {
  const blobWrap = document.getElementById('contact-blob-wrap')
  const blob = document.getElementById('contact-blob')
  const title = document.getElementById('contact-title')
  const socials = document.getElementById('contact-socials')
  const mailEl = document.getElementById('contact-mail')
  const dispo = document.getElementById('contact-dispo')
  const frame = document.getElementById('contact-frame')
  const frameImg = document.getElementById('contact-frame-img')
  const dispo2 = document.getElementById('contact-dispo-2')
  const frame2 = document.getElementById('contact-frame-2')
  const frameImg2 = document.getElementById('contact-frame-img-2')
  const stTimeline = document.getElementById('scroll-timeline')
  const pctEl = document.getElementById('scroll-pct')
  if (!blob) return

  buildDataChr('data-chr-contact')

  const contactBg = document.getElementById('contact-bg')
  ScrollTrigger.create({
    trigger: '#contact', start: 'top bottom', endTrigger: '#footer-transition', end: 'bottom bottom',
    onEnter: () => { blobWrap.style.visibility = 'visible'; contactBg.style.display = 'block' },
    onLeave: () => { blobWrap.style.visibility = 'hidden'; contactBg.style.display = 'none' },
    onLeaveBack: () => { blobWrap.style.visibility = 'hidden'; contactBg.style.display = 'none' },
    onEnterBack: () => { blobWrap.style.visibility = 'visible'; contactBg.style.display = 'block' },
  })
  blobWrap.style.visibility = 'hidden'

  const tl = gsap.timeline({ scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom bottom', scrub: true } })

  tl.fromTo(blob, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'none' }, 0)
  tl.to([stTimeline, pctEl], { opacity: 0, duration: 0.08 }, 0.1)

  gsap.set(title, { yPercent: 0, x: () => window.innerWidth * 1.1 })
  tl.to(title, { x: 0, duration: 0.3, ease: 'power3.out' }, 0.18)

  tl.fromTo(socials, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.2, ease: 'none' }, 0.28)
  tl.fromTo(mailEl, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.2, ease: 'none' }, 0.36)

  const pairStart = 0.22
  const frameDur = 0.65
  const frameYEnd = () => -window.innerHeight * 1.4
  const dispoY = () => window.innerHeight * 1.1
  const dispoYEnd = () => -window.innerHeight * 1.65
  const frameY = () => window.innerHeight * 1.1

  gsap.set(frame, { yPercent: -50, y: frameY })
  gsap.set(frameImg, { yPercent: -30 })
  tl.to(frame, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart)
  tl.to(frameImg, { yPercent: 30, duration: frameDur, ease: 'none' }, pairStart)

  gsap.set(dispo, { yPercent: -50, y: dispoY, opacity: 1, clipPath: 'inset(0% 0 0% 0)' })
  tl.to(dispo, { y: dispoYEnd, duration: frameDur, ease: 'none' }, pairStart)
  tl.to(dispo, { opacity: 0, clipPath: 'inset(100% 0 0% 0)', duration: 0.15, ease: 'power2.in' }, pairStart + 0.45)

  gsap.set(frame2, { yPercent: -50, y: () => window.innerHeight * 1.3 })
  gsap.set(frameImg2, { yPercent: -30 })
  tl.to(frame2, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart + 0.07)
  tl.to(frameImg2, { yPercent: 30, duration: frameDur, ease: 'none' }, pairStart + 0.07)

  gsap.set(dispo2, { yPercent: -50, y: frameY, opacity: 1, clipPath: 'inset(0% 0 0% 0)' })
  tl.to(dispo2, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart)
  tl.to(dispo2, { opacity: 0, clipPath: 'inset(100% 0 0% 0)', duration: 0.15, ease: 'power2.in' }, pairStart + 0.45)
}
