export function chapterIndexFromProgress(progress, count) {
  const clamped = Math.min(1, Math.max(0, Number(progress) || 0))
  return Math.min(count - 1, Math.floor(clamped * count))
}

export function getMotionMode({ width, reducedMotion, coarsePointer }) {
  if (reducedMotion) return 'reduced'
  if (width < 768 || coarsePointer) return 'compact'
  return 'desktop'
}

export function setChapterState(root, index, chapters) {
  root.querySelectorAll('[data-scene]').forEach((scene, sceneIndex) => {
    const active = sceneIndex === index
    scene.classList.toggle('is-active', active)
    scene.setAttribute('aria-hidden', String(!active))
  })

  root.querySelectorAll('[data-copy]').forEach((copy, copyIndex) => {
    const active = copyIndex === index
    copy.classList.toggle('is-active', active)
    copy.setAttribute('aria-hidden', String(!active))
  })

  root.querySelectorAll('[data-chapter-control]').forEach((control, controlIndex) => {
    if (controlIndex === index) control.setAttribute('aria-current', 'step')
    else control.removeAttribute('aria-current')
  })

  const mobileIndex = root.querySelector('[data-mobile-index]')
  if (mobileIndex) mobileIndex.textContent = String(index + 1).padStart(2, '0')

  const status = root.querySelector('[data-status]')
  if (status) status.textContent = `${chapters[index].label} chapter: ${chapters[index].title}`
}

function initializeNativeFallback(root, chapters) {
  const loader = root.querySelector('[data-loader]')
  const track = root.querySelector('.scroll-track')
  const progressBar = root.querySelector('[data-progress]')
  if (loader) loader.style.display = 'none'

  let currentIndex = -1
  const update = () => {
    const available = Math.max(1, track.scrollHeight - window.innerHeight)
    const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / available))
    const index = chapterIndexFromProgress(progress, chapters.length)
    if (index !== currentIndex) {
      currentIndex = index
      setChapterState(root, index, chapters)
    }
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`
  }

  window.addEventListener('scroll', update, { passive: true })
  update()
  return () => window.removeEventListener('scroll', update)
}

function animateScene(timeline, scene, index, start, duration, gsap) {
  const drift = start + duration * 0.12
  const end = start + duration

  if (index === 0) {
    timeline.to(scene.querySelector('.monolith'), { rotationY: 24, rotationX: 8, y: -34, scale: 1.18, duration, ease: 'none' }, start)
    timeline.to(scene.querySelector('.ridge--left'), { xPercent: -8, duration, ease: 'none' }, start)
    timeline.to(scene.querySelector('.ridge--right'), { xPercent: 8, duration, ease: 'none' }, start)
    timeline.to(scene.querySelectorAll('.water-lines i'), { x: (i) => (i % 2 ? 50 : -50), duration, stagger: 0.025, ease: 'none' }, start)
  }

  if (index === 1) {
    timeline.fromTo(scene.querySelectorAll('.ribbon-field path'), { strokeDashoffset: 180 }, { strokeDashoffset: -240, duration, stagger: 0.02, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.ribbon-gate--one'), { xPercent: -18, scale: .76 }, { xPercent: 8, scale: 1.12, duration, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.ribbon-gate--two'), { xPercent: 18, scale: .76 }, { xPercent: -8, scale: 1.12, duration, ease: 'none', immediateRender: false }, drift)
  }

  if (index === 2) {
    timeline.fromTo(scene.querySelectorAll('.network-lines path'), { strokeDashoffset: 260 }, { strokeDashoffset: -120, duration, stagger: 0.04, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelectorAll('.network-rings i'), { scale: .45, opacity: 0 }, { scale: 1.3, opacity: .6, duration: duration * .8, stagger: .08, ease: 'sine.out', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelectorAll('.network-nodes i'), { scale: 0, rotation: 0 }, { scale: 1, rotation: 135, duration: duration * .45, stagger: { amount: .55, from: 'random' }, ease: 'power2.out', immediateRender: false }, drift)
  }

  if (index === 3) {
    timeline.fromTo(scene.querySelector('.world-grid'), { yPercent: 24 }, { yPercent: -8, duration, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelectorAll('.blocks i'), { y: 95, opacity: 0, scaleY: .2 }, { y: 0, opacity: 1, scaleY: 1, duration: duration * .5, stagger: { amount: .6, from: 'center' }, ease: 'power3.out', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelectorAll('.light-road'), { scaleY: .2, opacity: 0 }, { scaleY: 1.25, opacity: 1, transformOrigin: 'bottom', duration: duration * .8, stagger: .09, ease: 'power2.out', immediateRender: false }, drift)
  }

  if (index === 4) {
    timeline.fromTo(scene.querySelectorAll('.contour-field path'), { strokeDashoffset: 300 }, { strokeDashoffset: -180, duration, stagger: 0.018, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.terrain--far'), { xPercent: -8 }, { xPercent: 5, duration, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.terrain--near'), { xPercent: 8 }, { xPercent: -5, duration, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.purpose-beam'), { xPercent: -480, opacity: 0 }, { xPercent: 420, opacity: .72, duration: duration * .84, ease: 'power1.inOut', immediateRender: false }, drift)
  }

  if (index === 5) {
    timeline.fromTo(scene.querySelectorAll('.city-nodes i'), { y: 45, scale: 0, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: duration * .55, stagger: { amount: .65, from: 'center' }, ease: 'power2.out', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.city-grid'), { yPercent: 20 }, { yPercent: -12, duration, ease: 'none', immediateRender: false }, drift)
    timeline.fromTo(scene.querySelector('.future-road'), { scaleY: .3, opacity: 0 }, { scaleY: 1.16, opacity: 1, transformOrigin: 'bottom', duration: duration * .8, ease: 'power2.out', immediateRender: false }, drift)
  }

  timeline.to(scene, { '--scene-progress': 1, duration, ease: 'none' }, start)
  return end
}

export async function initMotion(root, chapters) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const mode = getMotionMode({ width: window.innerWidth, reducedMotion, coarsePointer })
  document.documentElement.dataset.motion = mode

  let modules
  try {
    modules = await Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')])
  } catch (error) {
    console.warn('Enhanced motion unavailable; using native scrolling.', error)
    return initializeNativeFallback(root, chapters)
  }

  const [{ gsap }, scrollModule, lenisModule] = modules
  const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default
  const Lenis = lenisModule.default
  gsap.registerPlugin(ScrollTrigger)

  const track = root.querySelector('.scroll-track')
  const stage = root.querySelector('[data-stage]')
  const loader = root.querySelector('[data-loader]')
  const progress = root.querySelector('[data-progress]')
  const progressWrap = root.querySelector('[role="progressbar"]')
  const scenes = Array.from(root.querySelectorAll('[data-scene]'))
  const copies = Array.from(root.querySelectorAll('[data-copy]'))
  const endMark = root.querySelector('[data-end-mark]')
  const stageFooter = root.querySelector('.stage-footer')

  let activeIndex = 0
  let lenis = null
  let raf = null
  let pointerMove = null

  if (mode === 'desktop') {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: .88, touchMultiplier: 1.1 })
    lenis.on('scroll', ScrollTrigger.update)
    raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const xTo = gsap.quickTo(stage.querySelector('.scene-stack'), 'x', { duration: .9, ease: 'power3.out' })
    const yTo = gsap.quickTo(stage.querySelector('.scene-stack'), 'y', { duration: .9, ease: 'power3.out' })
    pointerMove = (event) => {
      xTo((event.clientX / window.innerWidth - .5) * -14)
      yTo((event.clientY / window.innerHeight - .5) * -9)
    }
    window.addEventListener('pointermove', pointerMove, { passive: true })
  }

  if (mode === 'reduced') {
    loader.style.display = 'none'
  } else {
    const counter = { value: 0 }
    const percent = loader.querySelector('[data-loader-percent]')
    const segments = Array.from(loader.querySelectorAll('.loader__segments i'))
    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to(counter, {
        value: 100,
        duration: 1.15,
        onUpdate: () => {
          const value = Math.round(counter.value)
          percent.textContent = String(value).padStart(2, '0')
          segments.forEach((segment, index) => segment.classList.toggle('is-lit', index < Math.ceil(value / (100 / segments.length))))
        },
      })
      .to(loader, { autoAlpha: 0, duration: .45 })
      .set(loader, { display: 'none' })
      .from('.topbar, .chapter-rail, .stage-footer, .hud-frame', { autoAlpha: 0, duration: .65, stagger: .06 }, '-=.25')
      .from(copies[0].children, { y: 24, autoAlpha: 0, duration: .65, stagger: .08 }, '<')
  }

  if (mode === 'reduced') {
    const cleanup = initializeNativeFallback(root, chapters)
    return () => cleanup()
  }

  gsap.set(scenes.slice(1), { autoAlpha: 0, scale: 1.04 })
  gsap.set(copies.slice(1), { autoAlpha: 0, y: 34 })

  const master = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: mode === 'desktop' ? 1.05 : .35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = chapterIndexFromProgress(self.progress, chapters.length)
        if (index !== activeIndex) {
          activeIndex = index
          setChapterState(root, index, chapters)
        }
        progress.style.transform = `scaleX(${self.progress})`
        progressWrap.setAttribute('aria-valuenow', String(Math.round(self.progress * 100)))
      },
    },
  })

  const segment = 2.3
  chapters.forEach((chapter, index) => {
    const start = index * segment
    master.addLabel(chapter.scene, start)

    if (index > 0) {
      master.to(scenes[index - 1], { autoAlpha: 0, scale: 1.1, filter: 'blur(8px)', duration: .6 }, start)
      master.to(copies[index - 1], { autoAlpha: 0, y: -30, duration: .36 }, start)
      master.fromTo(scenes[index], { autoAlpha: 0, scale: 1.06, filter: 'blur(8px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: .78, immediateRender: false }, start + .08)
      master.fromTo(copies[index], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: .58, immediateRender: false }, start + .26)
      master.fromTo(copies[index].children, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .52, stagger: .07, immediateRender: false }, start + .26)
    }

    animateScene(master, scenes[index], index, start, segment, gsap)
  })

  master.to(stageFooter, { autoAlpha: 0, duration: .25 }, chapters.length * segment - .65)
  master.to(endMark, { autoAlpha: 1, visibility: 'visible', duration: .45 }, chapters.length * segment - .42)

  const chapterClicks = []
  root.querySelectorAll('[data-chapter-control]').forEach((button, index) => {
    const handler = () => {
      const progressTarget = index / (chapters.length - 1)
      const y = track.offsetTop + (track.scrollHeight - window.innerHeight) * progressTarget
      if (lenis) lenis.scrollTo(y, { duration: 1.2 })
      else window.scrollTo({ top: y, behavior: 'smooth' })
    }
    button.addEventListener('click', handler)
    chapterClicks.push([button, handler])
  })

  ScrollTrigger.refresh()

  return () => {
    chapterClicks.forEach(([button, handler]) => button.removeEventListener('click', handler))
    if (pointerMove) window.removeEventListener('pointermove', pointerMove)
    if (raf) gsap.ticker.remove(raf)
    if (lenis) lenis.destroy()
    master.scrollTrigger?.kill()
    master.kill()
  }
}
