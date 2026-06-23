// Red "northern-lights" aurora — blurred vertical light curtains anchored at the top
// that drift on their own and parallax to the mouse. Used by the hero and the overlays.
// Substitute for the reference's Three.js fluid shader (not shipped with the files).
export function mountAurora(canvas, opts) {
  if (!canvas) return () => {}
  const intensity = (opts && opts.intensity) || 1
  canvas.style.background = '#0a0a0a'
  canvas.style.overflow = 'hidden'

  const field = document.createElement('div')
  field.style.cssText = 'position:absolute;top:0;left:-12%;right:-12%;height:92%;pointer-events:none;'
  canvas.appendChild(field)

  // bright bloom hugging the very top edge
  const cap = document.createElement('div')
  cap.style.cssText =
    'position:absolute;top:-26%;left:-12%;right:-12%;height:64%;pointer-events:none;' +
    `background:radial-gradient(120% 100% at 50% 0%, rgba(255,45,0,${0.72 * intensity}) 0%, rgba(195,25,0,0.3) 42%, transparent 72%);` +
    'filter:blur(46px);mix-blend-mode:screen;'
  canvas.appendChild(cap)

  const N = 8
  const bands = []
  for (let i = 0; i < N; i++) {
    const el = document.createElement('div')
    const hueTop = 4 + (i % 3) * 8
    el.style.cssText =
      'position:absolute;top:-18%;height:126%;width:34vw;left:0;' +
      'background:linear-gradient(to bottom,' +
      ` hsla(${hueTop},100%,53%,${0.85 * intensity}) 0%,` +
      ` hsla(2,100%,46%,${0.34 * intensity}) 40%,` +
      ' transparent 74%);' +
      'filter:blur(52px);mix-blend-mode:screen;will-change:transform,opacity;'
    field.appendChild(el)
    bands.push({
      el,
      base: i / (N - 1),
      phase: Math.random() * Math.PI * 2,
      sp: 0.16 + Math.random() * 0.3,
      amp: 5 + Math.random() * 7,
    })
  }

  let mx = 0.5
  let smx = 0.5
  const onMove = (e) => { mx = e.clientX / Math.max(1, window.innerWidth) }
  window.addEventListener('mousemove', onMove, { passive: true })

  let raf = 0
  function loop() {
    const t = performance.now() / 1000
    smx += (mx - smx) * 0.04
    const parallax = (smx - 0.5) * 28
    bands.forEach((b) => {
      const x = b.base * 100 + Math.sin(t * b.sp + b.phase) * b.amp + parallax
      const sy = 1 + Math.sin(t * b.sp * 0.8 + b.phase) * 0.16
      const op = (0.72 + Math.sin(t * b.sp * 1.3 + b.phase) * 0.28) * intensity
      b.el.style.transform = `translateX(${x.toFixed(2)}vw) translateX(-50%) scaleY(${sy.toFixed(3)})`
      b.el.style.opacity = Math.min(1, op).toFixed(3)
    })
    raf = requestAnimationFrame(loop)
  }
  loop()

  return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
}
