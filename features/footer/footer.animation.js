// Footer: procedurally-generated ASCII panels (with hover scramble + cursor parallax),
// the giant name that staggers up, and the contact->footer blob handoff.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildDataChr } from '@/shared/text-fx'

export function initFooter() {
  const POOLS = [
    ' ',
    '·.,',
    ':;`-~^',
    '=+<>?!:;',
    '|/\\()[]{}«»',
    '÷×±≈≠≤≥∞∑∏√∫',
    '¤†‡§¶©®™°¬',
    '%&#$@¥€£¢',
  ]

  let seed = 42
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return seed / 2147483647 }

  function imageToAscii(img, cols) {
    seed = 42
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    const aspect = img.height / img.width
    const rows = Math.round(cols * aspect)
    c.width = cols; c.height = rows
    ctx.drawImage(img, 0, 0, cols, rows)
    const data = ctx.getImageData(0, 0, cols, rows).data
    const lines = []
    const poolGrid = []
    for (let y = 0; y < rows; y++) {
      let line = ''
      const poolRow = []
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
        if (a < 15) { line += ' '; poolRow.push(-1); continue }
        let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        brightness *= (a / 255)
        let pi = Math.floor(brightness * (POOLS.length - 1) * 0.8)
        pi = Math.min(pi, POOLS.length - 1)
        const pool = POOLS[pi]
        line += pool[Math.floor(rand() * pool.length)]
        poolRow.push(pi)
      }
      lines.push(line)
      poolGrid.push(poolRow)
    }
    return { text: lines.join('\n'), poolGrid }
  }

  function setupHover(preEl, poolGrid) {
    let origLines = null
    let origGrid = null
    let mxC = -1000, myC = -1000
    const radius = 2.5
    const cols = poolGrid[0] ? poolGrid[0].length : 1
    const rows = poolGrid.length
    const noise = []
    const hitTime = []
    const cellDuration = []
    for (let ny = 0; ny < rows; ny++) {
      const nr = [], ht = [], cd = []
      for (let nx = 0; nx < cols; nx++) {
        const h = (Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453 % 1 + 1) % 1
        nr.push(h * 5 - 2.5)
        ht.push(0)
        cd.push(h > 0.5 ? 200 : 100)
      }
      noise.push(nr); hitTime.push(ht); cellDuration.push(cd)
    }
    let animating = false

    function init() {
      origLines = preEl.textContent.split('\n')
      origGrid = origLines.map((l) => l.split(''))
    }

    preEl.addEventListener('mousemove', (e) => {
      if (!origGrid) init()
      const rect = preEl.getBoundingClientRect()
      const charW = rect.width / cols
      const charH = rect.height / rows
      mxC = (e.clientX - rect.left) / charW
      myC = (e.clientY - rect.top) / charH
      const now = performance.now()
      const maxR = radius + 3
      const yMin = Math.max(0, Math.floor(myC - maxR))
      const yMax = Math.min(rows - 1, Math.ceil(myC + maxR))
      const xMin = Math.max(0, Math.floor(mxC - maxR))
      const xMax = Math.min(cols - 1, Math.ceil(mxC + maxR))
      for (let y = yMin; y <= yMax; y++) {
        for (let x = xMin; x <= xMax; x++) {
          const dx = x - mxC, dy = y - myC
          if (dx * dx + dy * dy < (radius + noise[y][x]) * (radius + noise[y][x])) hitTime[y][x] = now
        }
      }
      if (!animating) { animating = true; tick() }
    })
    preEl.addEventListener('mouseleave', () => { mxC = -1000; myC = -1000 })

    function esc(ch) {
      if (ch === '<') return '&lt;'
      if (ch === '>') return '&gt;'
      if (ch === '&') return '&amp;'
      return ch
    }

    function tick() {
      const now = performance.now()
      let anyActive = false
      let html = ''
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const pi = poolGrid[y][x]
          if (pi < 0) { html += ' '; continue }
          if (pi === 0) { html += ' '; continue }
          const elapsed = now - hitTime[y][x]
          if (hitTime[y][x] > 0 && elapsed < cellDuration[y][x]) {
            anyActive = true
            const idx = (POOLS.length - 1) - pi
            const pool = POOLS[idx]
            const ch = pool[Math.floor(Math.random() * pool.length)]
            html += '<span style="color:#0a0a0a;background:#ff3b14">' + esc(ch) + '</span>'
          } else {
            html += esc(origGrid[y][x])
          }
        }
        html += '\n'
      }
      preEl.innerHTML = html
      if (anyActive) requestAnimationFrame(tick)
      else { animating = false; if (origLines) preEl.textContent = origLines.join('\n') }
    }
  }

  // Build a procedural source image (organic blobs) instead of loading a PNG.
  function renderAsciiPlaceholder(targetId, cols, variant) {
    const n = 150
    const c = document.createElement('canvas')
    c.width = n; c.height = n
    const g = c.getContext('2d')
    g.fillStyle = '#000'; g.fillRect(0, 0, n, n)
    for (let k = 0; k < 7; k++) {
      const x = (Math.sin((k + 1) * (12.9 + variant)) * 0.5 + 0.5) * n
      const y = (Math.cos((k + 1) * (7.7 + variant)) * 0.5 + 0.5) * n
      const r = n * (0.16 + 0.14 * (Math.sin((k + 2) * 3.3 + variant) * 0.5 + 0.5))
      const rg = g.createRadialGradient(x, y, 0, x, y, r)
      rg.addColorStop(0, 'rgba(255,255,255,0.95)')
      rg.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = rg
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill()
    }
    const el = document.getElementById(targetId)
    if (el) {
      const result = imageToAscii(c, cols)
      el.textContent = result.text
      setupHover(el, result.poolGrid)
    }
  }

  renderAsciiPlaceholder('ascii-left', 80, 0)
  renderAsciiPlaceholder('ascii-right', 80, 1.7)

  const asciiLeftWrap = document.querySelector('.footer-ascii.left')
  const asciiRightWrap = document.querySelector('.footer-ascii.right')
  if (asciiLeftWrap && asciiRightWrap) {
    gsap.fromTo(asciiLeftWrap, { xPercent: -100 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '#footer-transition', start: 'top bottom+=500', end: 'bottom bottom', scrub: true },
    })
    gsap.fromTo(asciiRightWrap, { xPercent: 100 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '#footer-transition', start: 'top bottom+=500', end: 'bottom bottom', scrub: true },
    })
  }

  const asciiLeftPre = document.getElementById('ascii-left')
  const asciiRightPre = document.getElementById('ascii-right')
  let mx = 0, my = 0, sx = 0, sy = 0
  let footerVisible = false
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * 2
  })
  function parallaxLoop() {
    if (!footerVisible) return
    sx += (mx - sx) * 0.05
    sy += (my - sy) * 0.05
    const lx = Math.min(0, sx * -15 - 15)
    const rx = Math.max(0, sx * 15 + 15)
    const py = sy * -10
    if (asciiLeftPre) asciiLeftPre.style.transform = 'translate(' + lx + 'px, ' + py + 'px)'
    if (asciiRightPre) asciiRightPre.style.transform = 'translate(' + rx + 'px, ' + py + 'px)'
    requestAnimationFrame(parallaxLoop)
  }

  buildDataChr('data-chr-footer')

  const footerTopChars = document.querySelectorAll('#footer .footer-top .chr-hover .ch-top')
  if (footerTopChars.length) {
    gsap.set(footerTopChars, { clipPath: 'inset(100% 0 0 0)' })
    gsap.to(footerTopChars, {
      clipPath: 'inset(0 0 0 0)', ease: 'power3.out', stagger: { each: 0.015, from: 'start' },
      scrollTrigger: { trigger: '#footer-transition', start: 'center bottom+=500', end: 'bottom bottom', scrub: true },
    })
  }

  ;(function () {
    function rebuildChars(el, keepFirstLetter) {
      const text = el.textContent
      el.textContent = ''
      const inners = []
      for (let i = 0; i < text.length; i++) {
        const outer = document.createElement('span')
        outer.style.display = 'inline-block'
        outer.style.overflow = 'hidden'
        outer.style.verticalAlign = 'top'
        outer.style.padding = '0.1em 0.3em'
        outer.style.margin = '-0.1em -0.3em'
        if (keepFirstLetter && i === 0) outer.className = 'first-letter'
        const inner = document.createElement('span')
        inner.style.display = 'inline-block'
        inner.style.willChange = 'transform'
        inner.textContent = text[i]
        outer.appendChild(inner)
        el.appendChild(outer)
        inners.push(inner)
      }
      return inners
    }
    const lukeEl = document.querySelector('.footer-name-luke')
    const baffaitEl = document.querySelector('.footer-name-baffait')
    const dotEl = document.querySelector('.footer-name-dot')
    if (!lukeEl || !baffaitEl) return

    const lukeChars2 = rebuildChars(lukeEl, true)
    const baffaitChars2 = rebuildChars(baffaitEl, false)
    const dotChars = dotEl ? rebuildChars(dotEl, false) : []

    const ordered = []
    const lukeRev = lukeChars2.slice().reverse()
    const rightSide = baffaitChars2.concat(dotChars)
    const maxLen = Math.max(lukeRev.length, rightSide.length)
    for (let i = 0; i < maxLen; i++) {
      if (rightSide[i]) ordered.push(rightSide[i])
      if (lukeRev[i]) ordered.push(lukeRev[i])
    }

    gsap.set(ordered, { yPercent: 110 })
    gsap.to(ordered, {
      yPercent: 0, ease: 'power3.out', stagger: { each: 0.04, from: 'start' },
      scrollTrigger: { trigger: '#footer-transition', start: 'center bottom+=500', end: 'bottom bottom', scrub: true },
    })
  })()

  const footerEl = document.getElementById('footer')
  ScrollTrigger.create({
    trigger: '#footer-transition', start: 'top bottom+=500', end: 'bottom bottom',
    onEnter: () => { footerEl.style.visibility = 'visible'; footerVisible = true; parallaxLoop() },
    onLeave: () => {},
    onEnterBack: () => { footerVisible = true; parallaxLoop() },
    onLeaveBack: () => { footerEl.style.visibility = 'hidden'; footerVisible = false },
  })

  // contact -> footer blob handoff
  const contactPin = document.getElementById('contact-pin')
  const contactBlobWrap = document.getElementById('contact-blob-wrap')
  const contactBgEl = document.getElementById('contact-bg')
  const contactSection = document.getElementById('contact')
  const ctTitle = document.getElementById('contact-title')
  const ctSocials = document.getElementById('contact-socials')
  const ctMail = document.getElementById('contact-mail')

  const ftl = gsap.timeline({
    scrollTrigger: {
      trigger: '#footer-transition', start: 'top bottom+=550', end: 'bottom bottom', scrub: true,
      onUpdate: (self) => {
        if (self.progress > 0.2) { contactBgEl.style.display = 'none'; contactSection.style.pointerEvents = 'none' }
        else { contactBgEl.style.display = 'block'; contactSection.style.pointerEvents = '' }
      },
    },
  })

  ftl.set(contactBlobWrap, { height: '110vh', overflow: 'hidden', borderRadius: '0 0 0px 0px' }, 0)
  ftl.to(contactBlobWrap, { borderRadius: '0 0 50px 50px', duration: 0.15, ease: 'power2.out' }, 0)
  ftl.to(contactBlobWrap, { y: () => -(window.innerHeight * 1.8 + 400), immediateRender: false, duration: 1.0, ease: 'none' }, 0)
  ftl.to(contactPin, { y: '-40vh', pointerEvents: 'none', immediateRender: false, duration: 1.0, ease: 'none' }, 0)
  ftl.fromTo([ctSocials, ctMail], { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 0.1, ease: 'none' }, 0)
  ftl.fromTo(ctTitle, { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 0.25, ease: 'power2.in' }, 0)
}
