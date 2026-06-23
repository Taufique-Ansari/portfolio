// In-page overlay engine for Work / Info / Contact.
// Opening flies the clicked word to the top-left and reveals the overlay; closing
// reverses the exact same motion. No navigation, so the home page never reloads or
// replays its preloader. The Work overlay hosts a wheel/drag-driven 3D project cube.
import gsap from 'gsap'
import { PROJECTS } from '@/content/data'
import { mock } from '@/shared/placeholder'
import { mountAurora } from '@/shared/aurora'

export default function initPages() {
  if (typeof window === 'undefined') return
  if (window.__lbPagesInit) return
  window.__lbPagesInit = true

  const cover = document.getElementById('work-transition-overlay')
  const flyText = document.getElementById('work-flying-text')
  if (!cover || !flyText) return

  const SEL = { work: '#page-work', info: '#page-info', contact: '#page-contact' }
  const LABEL = { work: 'Work', info: 'Info', contact: 'Contact' }

  const auroraDone = {}
  function ensureAurora(key) {
    if (auroraDone[key]) return
    auroraDone[key] = true
    mountAurora(document.getElementById('page-' + key + '-aurora'), { intensity: 1.15 })
  }

  const lenisStop = () => { try { window.__lenis && window.__lenis.stop() } catch (e) {} }
  const lenisStart = () => { try { window.__lenis && window.__lenis.start() } catch (e) {} }

  let busy = false
  let openKey = null
  let srcRect = null
  let srcFs = null
  let cubeCleanup = null

  function open(key, linkEl) {
    if (busy || openKey) return
    const overlay = document.querySelector(SEL[key])
    if (!overlay) return
    busy = true
    openKey = key
    lenisStop()
    ensureAurora(key)

    const title = overlay.querySelector('.page-overlay-title')
    srcRect = linkEl.getBoundingClientRect()
    srcFs = getComputedStyle(linkEl).fontSize

    // make the overlay measurable (still hidden behind the cover) to read the title target
    overlay.style.visibility = 'visible'
    overlay.style.opacity = '0'
    const tRect = title.getBoundingClientRect()
    const tFs = getComputedStyle(title).fontSize
    title.style.opacity = '0'

    flyText.textContent = LABEL[key]
    gsap.set(flyText, { left: srcRect.left, top: srcRect.top, fontSize: srcFs, opacity: 1, x: 0, y: 0, transformOrigin: 'left top' })
    gsap.set(cover, { opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => { busy = false; if (key === 'work') startCube(overlay) },
    })
    tl.to(cover, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0)
    tl.to(flyText, { left: tRect.left, top: tRect.top, fontSize: tFs, duration: 0.85, ease: 'power3.inOut' }, 0.15)
    tl.add(() => {
      overlay.classList.add('active')
      overlay.style.opacity = ''
      overlay.style.visibility = ''
      overlay.setAttribute('aria-hidden', 'false')
      title.style.opacity = ''
      gsap.set(flyText, { opacity: 0 })
    }, 0.95)
    tl.to(cover, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 1.0)
  }

  function close() {
    if (busy || !openKey) return
    const key = openKey
    const overlay = document.querySelector(SEL[key])
    if (!overlay) return
    busy = true
    const title = overlay.querySelector('.page-overlay-title')
    const tRect = title.getBoundingClientRect()
    const tFs = getComputedStyle(title).fontSize

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.remove('active')
        overlay.setAttribute('aria-hidden', 'true')
        overlay.style.opacity = ''
        title.style.opacity = ''
        gsap.set(flyText, { opacity: 0 })
        if (cubeCleanup) { cubeCleanup(); cubeCleanup = null }
        lenisStart()
        busy = false
        openKey = null
      },
    })
    tl.to(cover, { opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 0)
    tl.add(() => {
      flyText.textContent = LABEL[key]
      gsap.set(flyText, { left: tRect.left, top: tRect.top, fontSize: tFs, opacity: 1, x: 0, y: 0 })
      title.style.opacity = '0'
      overlay.style.opacity = '0'
    }, 0.45)
    tl.to(flyText, { left: srcRect.left, top: srcRect.top, fontSize: srcFs, duration: 0.8, ease: 'power3.inOut' }, 0.5)
    tl.to(cover, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 1.25)
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const t = e.target
    if (!(t instanceof Element)) return
    if (t.closest('[data-page-close]')) { e.preventDefault(); close(); return }
    const link = t.closest('a[data-page-link]')
    if (!link) return
    e.preventDefault()
    const key = link.getAttribute('data-page-link')
    if (SEL[key]) open(key, link)
  }, true)

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openKey && !busy) close() })

  // ---- wheel/drag-driven 3D cube (Work overlay) ----
  function startCube(overlay) {
    const N = PROJECTS.length
    const cube = document.getElementById('cube')
    const cubeScene = cube ? cube.parentElement : null
    const cubeViewport = document.getElementById('cube-viewport')
    const faces = cube ? Array.from(cube.querySelectorAll('.cube-face')) : []
    const rulerL = document.getElementById('ruler-left')
    const rulerR = document.getElementById('ruler-right')
    const counterStrip = document.getElementById('counter-strip')
    const counterWrap = document.getElementById('counter-wrap')
    if (!cube || !cubeScene) return

    let R = cubeScene.offsetHeight / 2
    let counterItemH = 38

    function faceHtml(p, right) {
      const c = mock(p.id, 1500, 1000)
      return (
        `<div class="face-content ${right ? 'layout-right' : 'layout-left'}" data-lenis-prevent>` +
        `<div class="face-cover"><div class="face-name">${p.name}</div><img src="${c}" alt="${p.name}" decoding="async"></div>` +
        `<div class="face-info"><div class="face-info-bg"><img src="${c}" alt="" decoding="async"></div>` +
        `<div class="face-info-content"><div class="face-category">${p.category}</div><div class="face-year">${p.year}</div>` +
        `<div class="face-desc">${p.desc}</div><div class="face-tags">${p.tags.map((t) => `<span class="face-tag">${t}</span>`).join('')}</div>` +
        `</div></div></div>`
      )
    }
    function setFace(face, idx) {
      if (face.dataset.idx === String(idx)) return
      face.dataset.idx = String(idx)
      face.innerHTML = faceHtml(PROJECTS[idx], idx % 2 === 1)
    }
    function drawRuler(c, step) {
      if (!c) return
      const ctx = c.getContext('2d')
      const w = c.width
      const h = c.height
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(255,255,255,0.22)'
      ctx.lineWidth = 1
      const ticks = 64
      for (let i = 0; i <= ticks; i++) {
        const y = Math.round((i / ticks) * h) + 0.5
        const len = i % 5 === 0 ? 54 : 26
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(len, y); ctx.stroke()
      }
      const my = (N > 1 ? step / (N - 1) : 0) * h
      ctx.strokeStyle = '#ff1e00'
      ctx.lineWidth = 4
      ctx.beginPath(); ctx.moveTo(0, my); ctx.lineTo(w, my); ctx.stroke()
    }
    function layout() {
      R = cubeScene.offsetHeight / 2
      const rect = cubeScene.getBoundingClientRect()
      const rh = Math.round(rect.height)
      const vw = window.innerWidth
      ;[rulerL, rulerR].forEach((c) => {
        if (!c) return
        c.style.height = rh + 'px'
        c.style.marginTop = -rh / 2 + 'px'
        c.width = 120
        c.height = Math.max(2, Math.round(rh * 2))
      })
      if (rulerL) rulerL.style.left = Math.max(8, rect.left - 92) + 'px'
      if (rulerR) rulerR.style.left = Math.min(vw - 68, rect.right + 24) + 'px'
      if (counterWrap) {
        counterWrap.style.left = Math.min(vw - 96, rect.right + 92) + 'px'
        counterWrap.style.marginTop = '-1.2rem'
      }
      const fn = counterStrip ? counterStrip.querySelector('.counter-num') : null
      if (fn) counterItemH = fn.offsetHeight
    }
    function update(pp) {
      const step = Math.max(0, Math.min(1, pp)) * (N - 1)
      cube.style.transform = `translateZ(${(-R).toFixed(1)}px) rotateX(${(-step * 90).toFixed(2)}deg)`
      faces.forEach((face, k) => {
        const idx = k + 4 * Math.round((step - k) / 4)
        face.style.transform = `rotateX(${k * 90}deg) translateZ(${R.toFixed(1)}px)`
        if (idx < 0 || idx >= N) { face.style.visibility = 'hidden'; face.dataset.idx = '-1' }
        else { face.style.visibility = 'visible'; setFace(face, idx) }
      })
      const cur = Math.max(0, Math.min(N - 1, Math.round(step)))
      if (counterStrip) counterStrip.style.transform = `translateY(${(-cur * counterItemH).toFixed(1)}px)`
      drawRuler(rulerL, step)
      drawRuler(rulerR, step)
    }

    if (cubeViewport) gsap.set(cubeViewport, { opacity: 1 })
    layout()
    update(0)

    // smooth wheel/drag inertia
    let target = 0
    let curp = 0
    let raf = 0
    function tick() {
      curp += (target - curp) * 0.12
      update(curp)
      if (Math.abs(target - curp) > 0.0004) raf = requestAnimationFrame(tick)
      else { curp = target; update(curp); raf = 0 }
    }
    function bump(d) {
      target = Math.max(0, Math.min(1, target + d))
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onWheel = (e) => { e.preventDefault(); bump(e.deltaY * 0.0011) }
    overlay.addEventListener('wheel', onWheel, { passive: false })

    let dragging = false
    let lastY = 0
    // Don't start a drag (or capture the pointer) on interactive controls — otherwise
    // the BACK button / links never receive their click.
    const onDown = (e) => {
      if (e.target.closest && e.target.closest('[data-page-close], a, button, .face-info, .face-info-content')) return
      dragging = true
      lastY = e.clientY
    }
    const onMove = (e) => { if (!dragging) return; bump((lastY - e.clientY) * 0.0016); lastY = e.clientY }
    const onUp = () => { dragging = false }
    overlay.addEventListener('pointerdown', onDown)
    overlay.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    const onResize = () => { layout(); update(curp) }
    window.addEventListener('resize', onResize)

    cubeCleanup = () => {
      overlay.removeEventListener('wheel', onWheel)
      overlay.removeEventListener('pointerdown', onDown)
      overlay.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }
}
