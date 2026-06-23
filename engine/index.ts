// Animation orchestrator: creates the shared smooth-scroll, runs the intro, then boots
// each feature's animation module in order once the reveal frames are ready. The in-page
// overlays (Work/Info/Contact) run independently.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createSmoothScroll } from '@/shared/smooth-scroll'
import { runIntro } from '@/features/preloader/preloader.animation'
import { initReveal } from '@/features/reveal/reveal.animation'
import { initAbout } from '@/features/about/about.animation'
import { initProjects } from '@/features/projects/projects.animation'
import { initGallery } from '@/features/gallery/gallery.animation'
import { initScrollUI } from '@/features/scroll-ui/scroll-ui.animation'
import { initSkills } from '@/features/skills/skills.animation'
import { initContact } from '@/features/contact/contact.animation'
import { initFooter } from '@/features/footer/footer.animation'
import initOverlays from '@/features/overlays/overlays.animation'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lbPortfolioInit?: boolean
  }
}

export default function initPortfolio() {
  if (typeof window === 'undefined') return
  if (window.__lbPortfolioInit) return
  window.__lbPortfolioInit = true

  createSmoothScroll()

  function startSections() {
    initAbout()
    initProjects()
    initGallery()
    initScrollUI()
    initSkills()
    initContact()
    initFooter()
    ScrollTrigger.refresh()
  }

  runIntro({
    onIntroDone: () => {
      initReveal({ onSectionsReady: startSections }).catch((err) =>
        console.error('reveal failed:', err)
      )
    },
  })

  // Work / Info / Contact in-page overlays
  initOverlays()
}
