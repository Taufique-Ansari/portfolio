// Preloader / intro: builds the name, runs the entrance master timeline, then hands
// off to the reveal. Exposes `introState` (name refs + anchor helpers) that the reveal
// feature consumes for the exit-of-name animation.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroll } from '@/shared/smooth-scroll'
import { isMobile, getViewportSize, isMobileViewport } from '@/shared/env'
import { splitIntoChars, buildChrHover } from '@/shared/text-fx'
import { mountAurora } from '@/shared/aurora'

export const introState = {
  pContent: null,
  pLogo: null,
  pLuke: null,
  pBaffait: null,
  pDot: null,
  nameLayer: null,
  settledXvw: 0,
  anchored: false,
  stopAnchor: () => {},
}

export function runIntro({ onIntroDone }) {
  const shouldSkipLongIntro = !!sessionStorage.getItem('index-return-fade')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mustSkip = shouldSkipLongIntro || prefersReducedMotion

  if (history.scrollRestoration) {
    history.scrollRestoration = mustSkip ? 'auto' : 'manual'
  }

  let _isForcingScroll = false
  function _forceScrollTop() {
    if (_isForcingScroll) return
    _isForcingScroll = true
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    _isForcingScroll = false
  }
  function _preventTouchScroll(e) { e.preventDefault() }

  if (!mustSkip) {
    _forceScrollTop()
    window.addEventListener('scroll', _forceScrollTop)
    if (isMobile) {
      document.addEventListener('touchmove', _preventTouchScroll, { passive: false })
    } else {
      document.documentElement.style.overflow = 'hidden'
    }
    requestAnimationFrame(() => _forceScrollTop())
    window.addEventListener('load', () => { _forceScrollTop() }, { once: true })
  }

  function startShader() {
    mountAurora(document.getElementById('hero-canvas'), { intensity: 1.15 })
  }

  const introBg = document.getElementById('intro-bg')
  const pContent = document.getElementById('preloader-content')
  const pLogo = document.getElementById('preloader-logo')
  const pLuke = document.getElementById('preloader-taufique')
  const pBaffait = document.getElementById('preloader-ansari')
  const pDot = document.getElementById('preloader-dot')
  const tPanelRed = document.getElementById('t-panel-red')
  const tPanelDark = document.getElementById('t-panel-dark')
  const hero = document.getElementById('hero')
  const nameLayer = document.getElementById('name-layer')

  const logoChar = splitIntoChars(pLogo)
  const lukeChars = splitIntoChars(pLuke)
  const baffaitChars = splitIntoChars(pBaffait)
  const allRevealEls = [...logoChar, ...lukeChars, ...baffaitChars]

  function getCharGap() {
    return parseFloat(getComputedStyle(pBaffait).fontSize) * 0.55
  }

  function layoutNames() {
    const fs = parseFloat(getComputedStyle(pBaffait).fontSize)
    if (!fs) return
    const baselineOffset = -0.06
    const lukeLeft = pLuke.offsetLeft
    const lukeWidth = pLuke.offsetWidth
    const gapPx = fs * 0.55
    const baffaitLeftPx = lukeLeft + lukeWidth + gapPx
    pBaffait.style.left = (baffaitLeftPx / fs) + 'em'
    pBaffait.style.top = baselineOffset + 'em'
    const dotLeftPx = baffaitLeftPx + pBaffait.offsetWidth
    pDot.style.left = (dotLeftPx / fs) + 'em'
    pDot.style.top = baselineOffset + 'em'
  }
  layoutNames()

  gsap.set(pLogo, { opacity: 1 })
  gsap.set(pLuke, { opacity: 1 })
  gsap.set(pBaffait, { opacity: 1 })
  gsap.set(allRevealEls, { yPercent: 110 })
  gsap.set(pDot, { opacity: 0 })
  gsap.set([pContent, tPanelRed, tPanelDark], { willChange: 'transform' })

  function getTotalWidth() {
    return pLogo.offsetWidth + pLuke.offsetWidth + getCharGap() + pBaffait.offsetWidth + pDot.offsetWidth
  }

  let keepIntroNameAnchored = false
  let nameAnchorRaf = 0
  let _introSettledXvw = 0

  function placeIntroNameAtBottom() {
    layoutNames()
    const totalW = getTotalWidth()
    const offsetX = -(totalW / 2 - pLogo.offsetWidth / 2)
    const offsetX_vw = (offsetX / getViewportSize().width) * 100
    _introSettledXvw = offsetX_vw
    introState.settledXvw = offsetX_vw
    const newH = pContent.offsetHeight
    const vh = getViewportSize().height
    const bottomPad = isMobileViewport() ? Math.max(vh * 0.12, 80) : 80
    const targetBottom = vh - bottomPad
    const offsetY = targetBottom - newH / 2 - vh / 2
    gsap.set(pContent, { x: `${offsetX_vw}vw`, y: offsetY, transformOrigin: '50% 50%' })
  }

  function refreshIntroNameAnchor() {
    if (!keepIntroNameAnchored) return
    if (nameAnchorRaf) cancelAnimationFrame(nameAnchorRaf)
    nameAnchorRaf = requestAnimationFrame(() => {
      nameAnchorRaf = 0
      placeIntroNameAtBottom()
    })
  }

  function stopIntroNameAnchor() {
    keepIntroNameAnchored = false
    introState.anchored = false
    if (nameAnchorRaf) {
      cancelAnimationFrame(nameAnchorRaf)
      nameAnchorRaf = 0
    }
    window.removeEventListener('resize', refreshIntroNameAnchor)
  }
  window.addEventListener('resize', refreshIntroNameAnchor)

  // publish name refs/helpers for the reveal feature
  Object.assign(introState, {
    pContent, pLogo, pLuke, pBaffait, pDot, nameLayer,
    stopAnchor: stopIntroNameAnchor,
    cancelAnchorRaf: () => { if (nameAnchorRaf) { cancelAnimationFrame(nameAnchorRaf); nameAnchorRaf = 0 } },
  })

  const master = gsap.timeline({ delay: 0.2 })

  master
    .add(() => {
      layoutNames()
      gsap.set(pContent, { x: -(getTotalWidth() / 2 - pLogo.offsetWidth / 2) })
      gsap.set(pLuke, { x: 0 })
    })
    .to(allRevealEls, { yPercent: 0, duration: 0.4, ease: 'power3.out', stagger: { each: 0.025, from: 'center' } })
    .add(() => layoutNames())
    .to(pDot, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    .add(() => {
      startShader()
      document.getElementById('hero-tagline')?.style.setProperty('will-change', 'opacity, clip-path')
      document.getElementById('hero-bar')?.style.setProperty('will-change', 'opacity, clip-path')
      document.getElementById('hero-line')?.style.setProperty('will-change', 'transform')
    })
    .to({}, { duration: 0.3 })
    .add(() => {
      const mobile = isMobileViewport()
      const pad = mobile ? 20 : 48
      const currentW = getTotalWidth()
      const viewportSize = getViewportSize()
      const targetW = viewportSize.width - pad * 2
      const scale = targetW / currentW
      const visualCenterX = getTotalWidth() / 2
      const visualCenterY = pContent.offsetHeight / 2
      gsap.set(pContent, { transformOrigin: `${visualCenterX}px ${visualCenterY}px` })
      const vh = viewportSize.height
      const bottomPad = mobile ? Math.max(vh * 0.18, 110) : 80
      const targetBottom = vh - bottomPad
      const contentRect = pContent.getBoundingClientRect()
      const curVisualCenterY = contentRect.top + visualCenterY
      const targetVisualCenterY = targetBottom - (pContent.offsetHeight * scale / 2)
      const deltaY = targetVisualCenterY - curVisualCenterY
      const baseFontSize = parseFloat(getComputedStyle(pLogo).fontSize)
      const newFontSize = baseFontSize * scale

      const applyFinalState = () => {
        pContent.style.visibility = 'hidden'
        gsap.set(pContent, { scale: 1, x: 0, y: 0 })
        gsap.set(nameLayer, { mixBlendMode: 'difference' })
        const vwSize = (newFontSize / viewportSize.width) * 100
        ;[pLogo, pLuke, pBaffait, pDot].forEach((el) => { el.style.fontSize = `${vwSize}vw` })
        void pContent.offsetWidth
        placeIntroNameAtBottom()
        keepIntroNameAnchored = true
        introState.anchored = true
        pContent.style.visibility = 'visible'
      }

      if (shouldSkipLongIntro || prefersReducedMotion) { applyFinalState(); return }
      gsap.to(pContent, {
        scale, y: `+=${deltaY}`, duration: 0.75, ease: 'power3.inOut',
        onComplete: () => { requestAnimationFrame(applyFinalState) },
      })
    })
    .to(tPanelDark, { y: '0%', duration: 0.45, ease: 'power3.inOut' }, '<+=0.05')
    .to(tPanelRed, { y: '0%', duration: 0.45, ease: 'power3.inOut' }, '-=0.3')
    .set(introBg, { display: 'none' })
    .set(hero, { opacity: 1 })
    .to(tPanelRed, { y: '-100%', duration: 0.55, ease: 'power3.inOut' }, '+=0.05')
    .to(tPanelDark, { y: '-100%', duration: 0.55, ease: 'power3.inOut' }, '-=0.4')
    .to('#hero-tagline', { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' }, '-=0.2')
    .to('#hero-bar', { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.inOut' }, '-=0.8')
    .fromTo('#hero-line', { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power3.inOut' }, '<')
    .add(() => {
      document.querySelectorAll('.ch-top').forEach((el) => { el.style.willChange = 'clip-path' })
      chrHoverTl.play()
    }, '-=0.8')

  // build chr-hover split-flap markup + its (paused) reveal timeline
  buildChrHover()
  const chrHoverTl = gsap.timeline({ paused: true })
  document.querySelectorAll('.chr-hover').forEach((el, elIdx) => {
    el.querySelectorAll('.ch-top').forEach((ch, i) => {
      const pos = elIdx * 0.08 + i * 0.03
      chrHoverTl.fromTo(ch,
        { clipPath: 'inset(100% 0 0 0)', immediateRender: false },
        { clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power3.out' },
        pos)
    })
  })

  const lenis = scroll.lenis
  lenis.stop()
  lenis.scrollTo(0, { immediate: true })

  master.add(() => {
    window.removeEventListener('scroll', _forceScrollTop)
    if (isMobile) document.removeEventListener('touchmove', _preventTouchScroll)
    else document.documentElement.style.overflow = ''
    _forceScrollTop()
    requestAnimationFrame(_forceScrollTop)
    lenis.start()
    lenis.scrollTo(0, { immediate: true })

    allRevealEls.forEach((ch) => { ch.style.willChange = 'auto' })
    gsap.set([pContent, tPanelRed, tPanelDark], { willChange: 'auto' })
    document.getElementById('hero-tagline')?.style.setProperty('will-change', 'auto')
    document.getElementById('hero-bar')?.style.setProperty('will-change', 'auto')
    document.getElementById('hero-line')?.style.setProperty('will-change', 'auto')
    document.querySelectorAll('.ch-top').forEach((el) => { el.style.willChange = 'auto' })

    document.getElementById('transition-panel')?.remove()
    document.getElementById('intro-bg')?.remove()

    requestAnimationFrame(() => onIntroDone && onIntroDone())
  })

  if (mustSkip) {
    master.progress(1)
    master.pause()
    if (!shouldSkipLongIntro) {
      lenis.scrollTo(0, { immediate: true })
      _forceScrollTop()
      requestAnimationFrame(() => { _forceScrollTop(); ScrollTrigger.refresh() })
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return
    if (master && master.progress() < 1) master.progress(1)
  })

  return master
}
