// Projects: the magnetic sticky list, the 3D-tilt preview card, the animated fluid line,
// and the full-screen project-detail view. List + detail share state (projectOpen,
// _cachedSelImg), so they live together.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroll } from '@/shared/smooth-scroll'
import { mock } from '@/shared/placeholder'
import { PROJECTS as PROJECT_LIST } from '@/content/data'

export function initProjects() {
  const lenis = scroll.lenis
  const items = document.querySelectorAll('.proj-item')
  const card = document.getElementById('proj-card')
  const cover = document.getElementById('proj-cover')
  const dateEl = document.getElementById('proj-date')
  const preview = document.getElementById('proj-preview')
  let currentIdx = -1
  gsap.set(card, { opacity: 0 })

  items.forEach((item) => {
    const img = new Image()
    img.src = item.dataset.img
    if (img.decode) img.decode().catch(() => {})
  })

  const projectsEl = document.getElementById('projects')
  let _projectsVisible = false
  ScrollTrigger.create({
    trigger: projectsEl, start: 'top 80%', end: 'bottom 20%',
    onEnter: () => { preview.classList.add('visible'); _projectsVisible = true },
    onLeave: () => { preview.classList.remove('visible'); _projectsVisible = false },
    onEnterBack: () => { preview.classList.add('visible'); _projectsVisible = true },
    onLeaveBack: () => { preview.classList.remove('visible'); _projectsVisible = false },
  })

  const itemQuickX = [...items].map((item) => gsap.quickTo(item, 'x', { duration: 0.6, ease: 'power2.out' }))

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) {
        openProject(item.dataset.id, item)
      } else {
        activateProject(i)
        let docTop = 0, el = item
        while (el) { docTop += el.offsetTop; el = el.offsetParent }
        lenis.scrollTo(docTop - window.innerHeight / 2 + item.offsetHeight / 2, { duration: 1.2 })
      }
    })
  })
  cover.addEventListener('click', () => {
    if (currentIdx >= 0) openProject(items[currentIdx].dataset.id, items[currentIdx])
  })

  function onProjectsScroll() {
    if (!_projectsVisible) { if (currentIdx >= 0) deactivateAll(); return }
    const cy = window.innerHeight / 2
    const halfH = window.innerHeight / 2
    let closestIdx = -1, closestDist = Infinity
    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect()
      const itemCy = rect.top + rect.height / 2
      const dist = Math.abs(itemCy - cy)
      itemQuickX[i](Math.min(dist / halfH, 1) * 80)
      if (dist < closestDist) { closestDist = dist; closestIdx = i }
    })
    if (closestIdx >= 0 && closestDist < window.innerHeight * 0.45) activateProject(closestIdx)
    else deactivateAll()
  }
  lenis.on('scroll', onProjectsScroll)
  onProjectsScroll()

  function deactivateAll() {
    if (currentIdx >= 0) items[currentIdx].classList.remove('active')
    currentIdx = -1
    gsap.to(card, { opacity: 0, duration: 0.25, ease: 'power2.in' })
  }

  function activateProject(i) {
    if (i === currentIdx) return
    if (currentIdx >= 0) items[currentIdx].classList.remove('active')
    items[i].classList.add('active')
    if (currentIdx === -1) {
      cover.src = items[i].dataset.img
      dateEl.textContent = items[i].dataset.date
      gsap.to(card, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(card, {
        opacity: 0, duration: 0.18, ease: 'power2.in',
        onComplete: () => {
          cover.src = items[i].dataset.img
          dateEl.textContent = items[i].dataset.date
          gsap.to(card, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        },
      })
    }
    currentIdx = i
  }

  const projCursor = document.getElementById('proj-cursor')
  const qCursorX = gsap.quickTo(projCursor, 'left', { duration: 0.35, ease: 'power3.out' })
  const qCursorY = gsap.quickTo(projCursor, 'top', { duration: 0.35, ease: 'power3.out' })
  let _tiltTargetRY = 0, _tiltTargetRX = 0, _tiltRY = 0, _tiltRX = 0
  let _detTiltTargetRY = 0, _detTiltTargetRX = 0, _detTiltRY = 0, _detTiltRX = 0

  cover.addEventListener('mouseenter', () => { projCursor.classList.add('active') })
  cover.addEventListener('mouseleave', () => { projCursor.classList.remove('active') })

  let _cachedSelImg = null

  document.addEventListener('mousemove', (e) => {
    if (_projectsVisible) {
      qCursorX(e.clientX)
      qCursorY(e.clientY)
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const ry = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)))
      const rx = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
      _tiltTargetRY = ry * 6
      _tiltTargetRX = -rx * 5
    }
    if (projectOpen && _cachedSelImg) {
      const sr = _cachedSelImg.getBoundingClientRect()
      const scx = sr.left + sr.width / 2
      const scy = sr.top + sr.height / 2
      const dry = Math.max(-1, Math.min(1, (e.clientX - scx) / (sr.width / 2)))
      const drx = Math.max(-1, Math.min(1, (e.clientY - scy) / (sr.height / 2)))
      _detTiltTargetRY = dry * 8
      _detTiltTargetRX = -drx * 6
    }
  })

  gsap.ticker.add(() => {
    if (_projectsVisible) {
      _tiltRY += (_tiltTargetRY - _tiltRY) * 0.12
      _tiltRX += (_tiltTargetRX - _tiltRX) * 0.12
      card.style.transform = 'rotateY(' + _tiltRY.toFixed(2) + 'deg) rotateX(' + _tiltRX.toFixed(2) + 'deg)'
    }
    if (projectOpen && _cachedSelImg) {
      _detTiltRY += (_detTiltTargetRY - _detTiltRY) * 0.1
      _detTiltRX += (_detTiltTargetRX - _detTiltRX) * 0.1
      _cachedSelImg.style.transform = 'rotateY(' + _detTiltRY.toFixed(2) + 'deg) rotateX(' + _detTiltRX.toFixed(2) + 'deg)'
    }
  })

  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item, start: 'top 52%', end: 'bottom 48%',
      onEnter: () => lenis && lenis.options && (lenis.options.lerp = 0.04),
      onLeave: () => lenis && lenis.options && (lenis.options.lerp = 0.06),
      onEnterBack: () => lenis && lenis.options && (lenis.options.lerp = 0.04),
      onLeaveBack: () => lenis && lenis.options && (lenis.options.lerp = 0.06),
    })
  })

  // fluid line
  const linePath = document.getElementById('fluid-line')
  const lineLen = linePath.getTotalLength()
  gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen })
  gsap.to(linePath, {
    strokeDashoffset: 0, ease: 'none',
    scrollTrigger: { trigger: '#projects', start: 'top 70%', end: 'bottom 20%', scrub: 1 },
  })

  // ---- project detail overlay (data sourced from content/data.ts) ----
  const PROJECTS = {}
  PROJECT_LIST.forEach((p) => {
    PROJECTS[p.id] = {
      desc: p.desc, category: p.category, year: p.year, tags: p.tags,
      images: [0, 1, 2].map((k) => mock(p.id + '-' + (k + 2), 1500, 1000)),
    }
  })

  const detailEl = document.getElementById('project-detail')
  const detailTitle = document.getElementById('detail-title')
  const detailTitleWrap = document.getElementById('detail-title-wrap')
  const detailYear = document.getElementById('detail-year')
  const detailDesc = document.getElementById('detail-desc')
  const detailTags = document.getElementById('detail-tags')
  const detailThumbs = document.getElementById('detail-thumbs')
  const detailThumbsInner = document.getElementById('detail-thumbs-inner')
  const detailSelected = document.getElementById('detail-selected')
  const detailGalleryWrap = document.getElementById('detail-gallery-wrap')
  const flyingTitle = document.getElementById('flying-title')
  const pageFade = document.getElementById('page-fade')
  const detailBack = document.getElementById('detail-back')

  let projectOpen = false
  let _flyingSourceItem = null
  let _galleryRAF = null
  let _galleryY = 0, _galleryMaxScroll = 0
  let _qGalleryY = null
  let _activeThumbIdx = -1
  let _thumbImgs = []

  function updateActiveThumb() {
    if (!projectOpen) return
    if (!_thumbImgs.length) { _galleryRAF = requestAnimationFrame(updateActiveThumb); return }
    const thumbsRect = detailThumbs.getBoundingClientRect()
    const cy = thumbsRect.top + thumbsRect.height / 2
    let closestIdx = 0, closestDist = Infinity
    for (let i = 0; i < _thumbImgs.length; i++) {
      const rect = _thumbImgs[i].getBoundingClientRect()
      const imgCy = rect.top + rect.height / 2
      const dist = Math.abs(imgCy - cy)
      if (dist < closestDist) { closestDist = dist; closestIdx = i }
      const distNorm = dist / (thumbsRect.height * 0.45)
      let t = Math.max(0, 1 - distNorm)
      t = t * t * t
      _thumbImgs[i].style.width = (100 + t * 40) + '%'
    }
    if (closestIdx !== _activeThumbIdx) {
      if (_activeThumbIdx >= 0 && _thumbImgs[_activeThumbIdx]) _thumbImgs[_activeThumbIdx].classList.remove('active')
      _thumbImgs[closestIdx].classList.add('active')
      _activeThumbIdx = closestIdx
      if (_cachedSelImg) _cachedSelImg.src = _thumbImgs[closestIdx].src
    }
    _galleryRAF = requestAnimationFrame(updateActiveThumb)
  }

  function openProject(id, clickedItem) {
    const proj = PROJECTS[id]
    if (!proj || projectOpen) return
    projectOpen = true
    _flyingSourceItem = clickedItem
    lenis.stop()

    const stTimeline = document.getElementById('scroll-timeline')
    const pctEl = document.getElementById('scroll-pct')
    if (stTimeline) stTimeline.style.setProperty('display', 'none', 'important')
    if (pctEl) pctEl.style.setProperty('display', 'none', 'important')

    const rect = clickedItem.getBoundingClientRect()
    const cs = getComputedStyle(clickedItem)
    const startFontSize = parseFloat(cs.fontSize)
    flyingTitle.textContent = clickedItem.textContent
    flyingTitle.style.fontSize = startFontSize + 'px'
    flyingTitle.style.lineHeight = cs.lineHeight
    flyingTitle.style.letterSpacing = cs.letterSpacing
    flyingTitle.style.paddingTop = cs.paddingTop
    flyingTitle.style.paddingBottom = cs.paddingBottom
    gsap.set(flyingTitle, { left: rect.left, top: rect.top, opacity: 1, scale: 1, x: 0, y: 0, transformOrigin: 'left top' })

    clickedItem.style.visibility = 'hidden'

    detailTitle.textContent = clickedItem.textContent
    detailYear.textContent = proj.year
    detailDesc.textContent = proj.desc
    detailTags.innerHTML = proj.tags.map((t) => '<span class="detail-tag">' + t + '</span>').join('')

    const allImages = [clickedItem.dataset.img].concat(proj.images)
    detailThumbsInner.innerHTML = allImages.map((src) => '<img src="' + src + '" alt="" decoding="async">').join('')
    detailSelected.innerHTML = '<img src="' + allImages[0] + '" alt="" decoding="async">'
    detailThumbsInner.querySelectorAll('img').forEach((img, i) => {
      if (img.decode) img.decode().catch(() => {})
      img.addEventListener('click', () => {
        if (_activeThumbIdx >= 0 && _thumbImgs[_activeThumbIdx]) _thumbImgs[_activeThumbIdx].classList.remove('active')
        img.classList.add('active')
        _activeThumbIdx = i
        if (_cachedSelImg) _cachedSelImg.src = img.src
      })
    })
    _activeThumbIdx = 0
    _thumbImgs = [].slice.call(detailThumbsInner.querySelectorAll('img'))
    _thumbImgs[0].classList.add('active')
    _cachedSelImg = detailSelected.querySelector('img')
    _galleryY = 0
    gsap.set(detailThumbsInner, { y: 0 })

    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const targetTop = window.innerHeight * 0.22
    const targetLeft = remPx * 4
    const targetFontSize = Math.min(Math.max(window.innerWidth * 0.05, remPx * 3), remPx * 5)

    const tl = gsap.timeline()
    tl.to(pageFade, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
    tl.to(flyingTitle, { top: targetTop, left: targetLeft, fontSize: targetFontSize, paddingTop: 0, paddingBottom: 0, duration: 1, ease: 'power3.inOut' }, 0.3)
    tl.to(detailEl, { opacity: 1, duration: 0.4, ease: 'power2.out', onStart: () => { detailEl.classList.add('active') } }, 1.0)
    tl.set(flyingTitle, { opacity: 0 }, 1.1)
    tl.set(detailTitleWrap, { opacity: 1 }, 1.1)
    tl.to(detailDesc, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.2)
    tl.to(detailTags, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.3)
    tl.to(detailBack, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.3)
    tl.fromTo(detailGalleryWrap, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.2)
    tl.add(() => {
      _galleryMaxScroll = Math.max(0, detailThumbsInner.scrollHeight - detailThumbs.clientHeight)
      _qGalleryY = gsap.quickTo(detailThumbsInner, 'y', { duration: 0.8, ease: 'power2.out' })
      _galleryRAF = requestAnimationFrame(updateActiveThumb)
    })
  }

  function closeProject() {
    if (!projectOpen) return
    projectOpen = false
    if (_galleryRAF) { cancelAnimationFrame(_galleryRAF); _galleryRAF = null }
    _qGalleryY = null

    const stTimeline = document.getElementById('scroll-timeline')
    const pctEl = document.getElementById('scroll-pct')
    if (stTimeline) stTimeline.style.removeProperty('display')
    if (pctEl) pctEl.style.removeProperty('display')

    const tl = gsap.timeline()
    tl.to([detailDesc, detailTags, detailBack], { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
    tl.to(detailGalleryWrap, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)

    const dtRect = detailTitle.getBoundingClientRect()
    const dtCs = getComputedStyle(detailTitle)
    flyingTitle.textContent = detailTitle.textContent
    flyingTitle.style.fontSize = dtCs.fontSize
    flyingTitle.style.lineHeight = dtCs.lineHeight
    flyingTitle.style.letterSpacing = dtCs.letterSpacing
    flyingTitle.style.paddingTop = '0'
    flyingTitle.style.paddingBottom = '0'
    gsap.set(flyingTitle, { left: dtRect.left, top: dtRect.top, opacity: 1, x: 0, y: 0 })
    gsap.set(detailTitleWrap, { opacity: 0 })

    tl.to(detailEl, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.2)

    if (_flyingSourceItem) {
      const itemRect = _flyingSourceItem.getBoundingClientRect()
      const itemCs = getComputedStyle(_flyingSourceItem)
      tl.to(flyingTitle, {
        left: itemRect.left, top: itemRect.top, fontSize: parseFloat(itemCs.fontSize),
        paddingTop: itemCs.paddingTop, paddingBottom: itemCs.paddingBottom, duration: 0.9, ease: 'power3.inOut',
      }, 0.3)
    }
    tl.to(pageFade, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
    tl.add(() => {
      detailEl.classList.remove('active')
      gsap.set([detailTitleWrap, detailDesc, detailTags, detailBack, detailGalleryWrap], { opacity: 0 })
      gsap.set(flyingTitle, { opacity: 0 })
      _activeThumbIdx = -1
      _thumbImgs = []
      _cachedSelImg = null
      if (_flyingSourceItem) { _flyingSourceItem.style.visibility = ''; _flyingSourceItem = null }
      lenis.start()
      ScrollTrigger.refresh()
    })
  }

  detailEl.addEventListener('wheel', (e) => {
    if (!projectOpen) return
    e.preventDefault()
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    _galleryY = Math.max(-_galleryMaxScroll, Math.min(0, _galleryY - delta))
    if (_qGalleryY) _qGalleryY(_galleryY)
  }, { passive: false })

  let _detailTouchStartY = 0
  detailEl.addEventListener('touchstart', (e) => {
    if (!projectOpen) return
    _detailTouchStartY = e.touches[0].clientY
  }, { passive: true })
  detailEl.addEventListener('touchmove', (e) => {
    if (!projectOpen) return
    e.preventDefault()
    const y = e.touches[0].clientY
    const delta = _detailTouchStartY - y
    _detailTouchStartY = y
    _galleryY = Math.max(-_galleryMaxScroll, Math.min(0, _galleryY - delta))
    if (_qGalleryY) _qGalleryY(_galleryY)
  }, { passive: false })

  detailBack.addEventListener('click', closeProject)
}
