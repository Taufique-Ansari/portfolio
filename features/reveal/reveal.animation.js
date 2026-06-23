// Reveal: full-screen scroll-scrubbed image sequence (public/frames/0001..0300.jpeg)
// with over-scan parallax, plus the name exit and the "Basically, I make websites." phrase.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isMobile, isSlowHardware, isMobileViewport } from '@/shared/env'
import { introState } from '@/features/preloader/preloader.animation'

export async function initReveal({ onSectionsReady }) {
  const { pContent, pLogo, pLuke, pBaffait, pDot, nameLayer } = introState
  introState.cancelAnchorRaf()
  ;[pContent, pLogo, pLuke, pBaffait, pDot].forEach((el) => gsap.killTweensOf(el))

  const revealWrap = document.getElementById('reveal-image-wrap')
  const revealSeq = document.querySelectorAll('.reveal-seq')
  const canvas = document.getElementById('reveal-canvas')
  const ctx = canvas.getContext('2d')

  const phraseEl = document.getElementById('reveal-phrase')
  phraseEl.innerHTML = [...phraseEl.textContent]
    .map((ch) => `<span class="rp-char" style="display:inline-block;">${ch === ' ' ? '&nbsp;' : ch}</span>`)
    .join('')
  const phraseChars = phraseEl.querySelectorAll('.rp-char')
  gsap.set(phraseChars, isMobile ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)' })

  // Real hero image sequence (public/frames/0001.jpeg … 0300.jpeg), scroll-scrubbed.
  const FRAME_DIR = '/frames/'
  const FRAME_EXT = '.jpeg'
  const FRAME_PAD = 4
  const TOTAL_FRAMES = 300
  const frameUrl = (n) => `${FRAME_DIR}${String(n).padStart(FRAME_PAD, '0')}${FRAME_EXT}`
  const frames = new Array(TOTAL_FRAMES)
  let loadedFrameIdx = []
  let totalFrames = 0
  let drawnIdx = -1

  function rebuildLoadedFrameIndex() {
    loadedFrameIdx = []
    for (let i = 0; i < frames.length; i++) {
      if (frames[i] && frames[i].naturalWidth) loadedFrameIdx.push(i)
    }
    totalFrames = loadedFrameIdx.length
  }

  canvas.style.willChange = 'transform'

  function resizeCanvas() {
    const dpr = isSlowHardware ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(window.innerWidth * dpr)
    canvas.height = Math.round(window.innerHeight * dpr)
    if (drawnIdx >= 0) { const i = drawnIdx; drawnIdx = -1; drawFrame(i) }
  }

  // Parallax: the frame is over-scanned so there's slack to pan (parY=scroll, parX=cursor).
  const OVERSCAN = 1.08
  let parX = 0
  let parY = 0
  let _smParX = 0
  let _lastDrawMs = 0
  let _lastPar = 9
  function drawFrame(i) {
    const par = parX * 1000 + parY
    if (i === drawnIdx && par === _lastPar) return
    if (isSlowHardware) {
      const now = performance.now()
      if (now - _lastDrawMs < 32) return
      _lastDrawMs = now
    }
    if (i < 0 || i >= frames.length) return
    const img = frames[i]
    if (!(img && img.naturalWidth)) return
    const cw = canvas.width, ch = canvas.height
    const iw = img.naturalWidth, ih = img.naturalHeight
    const s = Math.max(cw / iw, ch / ih) * OVERSCAN
    const dw = iw * s, dh = ih * s
    const slackX = (dw - cw) / 2
    const slackY = (dh - ch) / 2
    const ox = (cw - dw) * 0.5 + parX * slackX
    const oy = (ch - dh) * 0.5 + parY * slackY
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, ox, oy, dw, dh)
    drawnIdx = i
    _lastPar = par
  }

  window.addEventListener('mousemove', (e) => {
    const tx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 0.7
    _smParX = tx
    parX = parX + (_smParX - parX) * 1
    if (drawnIdx >= 0) drawFrame(drawnIdx)
  }, { passive: true })

  function probe(n) {
    return new Promise((resolve) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
      img.src = frameUrl(n)
    })
  }
  async function probeWithRetry(n, attempts = 3) {
    for (let k = 0; k < attempts; k++) {
      const img = await probe(n)
      if (img) return img
    }
    return null
  }
  async function loadFirstBatch() {
    const first = await probeWithRetry(1, 3)
    if (!first) { console.error('Frame 1 failed to load!'); return 0 }
    frames[0] = first
    rebuildLoadedFrameIndex()
    resizeCanvas()
    drawFrame(0)
    const SPEED_BATCH = 10
    const t0 = performance.now()
    const batchNums = Array.from({ length: Math.min(SPEED_BATCH, TOTAL_FRAMES - 1) }, (_, k) => k + 2)
    await Promise.all(batchNums.map(async (n) => {
      const img = await probeWithRetry(n, 2)
      if (img) frames[n - 1] = img
    }))
    const elapsed = performance.now() - t0
    rebuildLoadedFrameIndex()
    return elapsed > 4000 ? 3 : elapsed > 2000 ? 2 : 1
  }
  async function loadRemainingFrames(skip) {
    const BATCH_END = 11
    const toLoad = []
    for (let i = BATCH_END + 1; i <= TOTAL_FRAMES; i++) {
      if (skip <= 1 || i % skip === 0) toLoad.push(i)
    }
    let cursor = 0
    const failed = []
    const CONCURRENCY = isSlowHardware ? 2 : 6
    const worker = async () => {
      while (cursor < toLoad.length) {
        const n = toLoad[cursor++]
        if (frames[n - 1] && frames[n - 1].naturalWidth) continue
        const img = await probeWithRetry(n, 2)
        if (img) { frames[n - 1] = img; rebuildLoadedFrameIndex() }
        else failed.push(n)
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker))
    for (const n of [...failed]) {
      const img = await probeWithRetry(n, 2)
      if (img) { frames[n - 1] = img; rebuildLoadedFrameIndex() }
    }
  }

  window.addEventListener('resize', resizeCanvas)
  let frameSkip = await loadFirstBatch()
  if (isMobile) frameSkip = Math.max(frameSkip, 3)
  if (totalFrames === 0) { console.error('No reveal frames loaded.'); return }
  loadRemainingFrames(frameSkip).catch((err) => console.error('Frame background load error:', err))

  const introSettledY = Number(gsap.getProperty(pContent, 'y')) || 0
  const introXvw = `${introState.settledXvw}vw`

  const scrollTl = gsap.timeline({ paused: true })
  scrollTl.fromTo(pContent, { x: introXvw, y: introSettledY }, { x: introXvw, y: 0, duration: 0.3, ease: 'none' }, 0)
  scrollTl.fromTo('#hero-tagline', { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'none' }, 0)
  scrollTl.fromTo('#hero-bar', { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'none' }, 0)
  scrollTl.fromTo('#hero-line', { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'none' }, 0)
  scrollTl.fromTo(revealWrap, { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.3)
  scrollTl.fromTo(revealSeq, { scale: 0 }, { scale: 1, duration: 0.7, ease: 'none' }, 0.3)

  const mobile = isMobileViewport()
  const exitLeft = mobile ? '-35vw' : '-55vw'
  const exitRight = mobile ? '35vw' : '55vw'
  scrollTl.fromTo(pLogo, { x: '0vw', opacity: 1 }, { x: exitLeft, opacity: 0, duration: 0.7, ease: 'none' }, 0.3)
  scrollTl.fromTo(pLuke, { x: '0vw', opacity: 1 }, { x: exitLeft, opacity: 0, duration: 0.7, ease: 'none' }, 0.3)
  scrollTl.fromTo(pBaffait, { x: '0vw', opacity: 1 }, { x: exitRight, opacity: 0, duration: 0.7, ease: 'none' }, 0.3)
  scrollTl.fromTo(pDot, { x: '0vw', opacity: 1 }, { x: exitRight, opacity: 0, duration: 0.7, ease: 'none' }, 0.3)
  scrollTl.set(nameLayer, { autoAlpha: 0 }, 0.98)

  scrollTl.to(phraseChars, {
    opacity: 1,
    ...(isMobile ? {} : { filter: 'blur(0px)' }),
    duration: 0.06, ease: 'none', stagger: { each: 0.007, from: 'start' },
  }, 0.62)

  const REVEAL_PHASE_START = 0.3
  const REVEAL_PHASE_DURATION = 0.7
  const FRAME_PROGRESS_AT_EXIT_START = 0.82

  function drawFrameAtProgress(progress) {
    if (totalFrames === 0) return
    const clamped = Math.min(1, Math.max(0, progress))
    const loadedPos = Math.round(clamped * (totalFrames - 1))
    const sourceIdx = loadedFrameIdx[loadedPos]
    if (sourceIdx == null) return
    drawFrame(sourceIdx)
  }

  ScrollTrigger.create({
    trigger: '#scroll-wrap', start: 'top top', end: 'bottom bottom', scrub: 0.5, animation: scrollTl,
    onUpdate: (self) => {
      const p = self.progress
      if (introState.anchored && p > 0.001) introState.stopAnchor()
      if (p < REVEAL_PHASE_START) { parY = -0.5; drawFrameAtProgress(0); return }
      const phase2 = Math.min(1, Math.max(0, (p - REVEAL_PHASE_START) / REVEAL_PHASE_DURATION))
      parY = (phase2 - 0.5) * 1.1
      drawFrameAtProgress(phase2 * FRAME_PROGRESS_AT_EXIT_START)
    },
  })

  const revealOverlay = document.getElementById('reveal-overlay')
  const exitTl = gsap.timeline({ paused: true })
  exitTl.to(revealWrap, { y: '-50vh', ease: 'none', duration: 1 }, 0)
  exitTl.to(revealOverlay, { opacity: 0.7, ease: 'none', duration: 0.66 }, 0)
  if (!isMobile && (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'))) {
    gsap.set(revealOverlay, { backdropFilter: 'blur(0px)' })
    exitTl.to(revealOverlay, { backdropFilter: 'blur(16px)', ease: 'none', duration: 1 }, 0)
  }

  const phraseExitTl = gsap.timeline({ paused: true })
  phraseExitTl.to(phraseChars, { opacity: 0, duration: 0.2, ease: 'none', immediateRender: false, stagger: { each: 0.01, from: 'end' } })
  ScrollTrigger.create({ trigger: '#section-after', start: 'top bottom', end: 'top top', scrub: true, animation: phraseExitTl })

  ScrollTrigger.create({
    trigger: '#section-after', start: 'top bottom', end: 'top top', scrub: true, animation: exitTl,
    onUpdate: (self) => {
      parY = 0.55 + self.progress * 0.35
      const exitFrameProgress = FRAME_PROGRESS_AT_EXIT_START + (self.progress * (1 - FRAME_PROGRESS_AT_EXIT_START))
      drawFrameAtProgress(exitFrameProgress)
    },
    onLeave: () => drawFrameAtProgress(1),
    onLeaveBack: () => drawFrameAtProgress(FRAME_PROGRESS_AT_EXIT_START),
  })

  if (onSectionsReady) onSectionsReady()
}
