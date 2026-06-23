// Lenis smooth-scroll singleton, shared across feature animations and the overlay engine.
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const scroll: { lenis: Lenis | null } = { lenis: null }

export function createSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.06 })
  scroll.lenis = lenis
  // exposed so the overlay engine can lock/unlock scroll
  ;(window as unknown as { __lenis: Lenis }).__lenis = lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}
