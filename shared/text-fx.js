// Shared text effects used across features: per-character splitting, word wrapping,
// and the "chr-hover" reveal markup. (i18n is stubbed — getCharHTML is identity.)

export function getCharHTML(ch) {
  if (ch === ' ') return '&nbsp;'
  if (ch === '<') return '&lt;'
  if (ch === '>') return '&gt;'
  if (ch === '&') return '&amp;'
  return ch
}

// Split an element's text into per-character spans (used by the preloader name).
export function splitIntoChars(el) {
  const raw = el.textContent
  el.innerHTML = ''
  const inners = []
  raw.split('').forEach((ch) => {
    const outer = document.createElement('span')
    outer.style.cssText =
      'display:inline-block;overflow:hidden;vertical-align:top;padding:0.15em 0.3em;margin:-0.15em -0.3em;'
    const inner = document.createElement('span')
    inner.className = 'char'
    inner.style.display = 'inline-block'
    inner.textContent = ch === ' ' ? ' ' : ch
    outer.appendChild(inner)
    el.appendChild(outer)
    inners.push(inner)
  })
  return inners
}

// Wrap each word of an element's text in a <span class="word"> (used by about / gallery phrase).
export function wrapWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((node) => {
    const words = node.textContent.split(/(\s+)/)
    const frag = document.createDocumentFragment()
    words.forEach((w) => {
      if (/^\s+$/.test(w)) {
        frag.appendChild(document.createTextNode(w))
      } else if (w) {
        const span = document.createElement('span')
        span.className = 'word'
        span.textContent = w
        frag.appendChild(span)
      }
    })
    node.parentNode.replaceChild(frag, node)
  })
}

// Build the split-flap "chr-hover" markup for every [data-chr] element.
export function buildChrHover() {
  document.querySelectorAll('.chr-hover[data-chr]').forEach((el) => {
    const text = el.dataset.chr
    ;[...text].forEach((ch, i) => {
      const wrap = document.createElement('span')
      wrap.className = 'ch-wrap'
      wrap.style.setProperty('--i', i)
      const top = document.createElement('span')
      top.className = 'ch-top'
      top.innerHTML = getCharHTML(ch)
      const bot = document.createElement('span')
      bot.className = 'ch-bot'
      bot.innerHTML = getCharHTML(ch)
      wrap.appendChild(top)
      wrap.appendChild(bot)
      el.appendChild(wrap)
    })
  })
}

// Variant for the contact/footer links which use [data-chr-contact] / [data-chr-footer]
// and need explicit spacing for spaces.
export function buildDataChr(attr) {
  document.querySelectorAll('[' + attr + ']').forEach((el) => {
    const text = el.getAttribute(attr)
    el.removeAttribute(attr)
    Array.from(text).forEach((ch, i) => {
      if (ch === ' ') {
        el.insertAdjacentHTML('beforeend', '<span style="width:0.35em;display:inline-block">&nbsp;</span>')
        return
      }
      const wrap = document.createElement('span')
      wrap.className = 'ch-wrap'
      wrap.style.setProperty('--i', i)
      const chHTML = getCharHTML(ch)
      wrap.innerHTML = '<span class="ch-top">' + chHTML + '</span><span class="ch-bot">' + chHTML + '</span>'
      el.appendChild(wrap)
    })
  })
}
