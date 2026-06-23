// Circle gallery: each cover is sliced into a curved cylinder and the ring orbits the
// phrase as the pinned 600vh section scrolls. Desktop only.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isMobileViewport } from '@/shared/env'
import { wrapWords } from '@/shared/text-fx'

export function initGallery() {
  if (isMobileViewport()) return

  const vw = window.innerWidth

  ;(function buildSlices() {
    const SLICES = 10
    const imgW = Math.min(Math.max(120, vw * 0.14), 210)
    const imgH = imgW * 2 / 3
    const orbitR = (vw * 0.34 + 500) / 2
    const bendRad = imgW / orbitR
    const cylR = orbitR
    const sliceW = imgW / SLICES
    const totalBendDeg = bendRad * 180 / Math.PI
    const stepDeg = totalBendDeg / SLICES

    document.querySelectorAll('.cg-img').forEach((img) => {
      const src = img.getAttribute('src')
      const wrapper = document.createElement('div')
      wrapper.className = 'cg-img'
      for (let s = 0; s < SLICES; s++) {
        const sl = document.createElement('div')
        sl.className = 'cg-slice'
        const displayW = sliceW + 1.5
        sl.style.width = displayW.toFixed(1) + 'px'
        sl.style.left = '50%'
        sl.style.marginLeft = (-displayW / 2).toFixed(1) + 'px'
        sl.style.backgroundImage = 'url(' + src + ')'
        sl.style.backgroundSize = imgW.toFixed(1) + 'px ' + imgH.toFixed(1) + 'px'
        sl.style.backgroundPosition = (-s * sliceW).toFixed(1) + 'px 0'
        sl.style.transformOrigin = '50% 50% ' + (-cylR).toFixed(1) + 'px'
        const angle = (s - (SLICES - 1) / 2) * stepDeg
        sl.style.transform = 'rotateY(' + angle.toFixed(2) + 'deg)'
        wrapper.appendChild(sl)
      }
      img.parentNode.replaceChild(wrapper, img)
    })
  })()

  const cgImgs = gsap.utils.toArray('.cg-img')
  const cgPhrase = document.getElementById('cg-phrase')
  const count = cgImgs.length

  wrapWords(cgPhrase)
  const cgPhraseWords = gsap.utils.toArray('#cg-phrase .word')

  const rx = vw * 0.34
  const rz = 500
  const tiltY = vw <= 768 ? 80 : 180
  const entryAngle = Math.PI / 2
  const offX = vw * 0.85

  function getPos(t) {
    if (t <= 0.12) {
      const p = t / 0.12
      return { x: -offX * (1 - p), y: tiltY, z: rz * p, rotY: 0 }
    }
    if (t <= 0.88) {
      const p = (t - 0.12) / 0.76
      const angle = entryAngle - p * Math.PI * 2
      const x = Math.cos(angle) * rx
      const z = Math.sin(angle) * rz
      const ry = p * Math.PI * 2
      return { x, y: (z / rz) * tiltY, z, rotY: ry }
    }
    const p2 = (t - 0.88) / 0.12
    return { x: offX * p2, y: tiltY, z: rz * (1 - p2), rotY: Math.PI * 2 }
  }

  const stagger = 0.09
  const totalRange = 1 + stagger * (count - 1)
  cgImgs.forEach((img) => { img.style.opacity = '0' })

  ScrollTrigger.create({
    trigger: '#circle-gallery', start: 'top top', end: 'bottom bottom', pin: '#circle-gallery-pin',
    onUpdate: (self) => {
      const progress = self.progress
      cgImgs.forEach((img, i) => {
        const imgT = progress * totalRange - i * stagger
        if (imgT <= 0 || imgT >= 1) { img.style.opacity = '0'; return }
        let alpha = 1
        if (imgT < 0.06) alpha = imgT / 0.06
        else if (imgT > 0.94) alpha = (1 - imgT) / 0.06
        const pos = getPos(imgT)
        const rotDeg = (pos.rotY * 180 / Math.PI).toFixed(1)
        img.style.transform =
          'translate3d(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px,' + pos.z.toFixed(1) + 'px)' +
          ' rotateY(' + rotDeg + 'deg)'
        img.style.opacity = alpha
        img.style.zIndex = Math.round(pos.z + 600)
      })

      const phraseStart = 0.25
      const phraseEnd = 0.75
      const travelY = 200
      if (progress < phraseStart || progress > phraseEnd) {
        cgPhrase.style.opacity = '0'
      } else {
        const globalP = (progress - phraseStart) / (phraseEnd - phraseStart)
        const yOffset = travelY * (0.5 - globalP)
        cgPhrase.style.transform = 'translateY(' + yOffset.toFixed(1) + 'px)'
        const revealEnd = 0.4
        cgPhraseWords.forEach((w, wi) => {
          if (globalP < revealEnd) {
            const revealP = globalP / revealEnd
            const wordT = revealP * (cgPhraseWords.length + 4) - wi
            const wP = Math.max(0, Math.min(1, wordT / 3))
            w.style.opacity = wP
            w.style.filter = 'blur(' + (8 * (1 - wP)).toFixed(1) + 'px)'
          } else {
            w.style.opacity = '1'
            w.style.filter = 'blur(0px)'
          }
        })
        let alpha = 1
        if (globalP < 0.1) alpha = globalP / 0.1
        else if (globalP > 0.75) alpha = (1 - globalP) / 0.25
        cgPhrase.style.opacity = alpha
      }
    },
  })
}
