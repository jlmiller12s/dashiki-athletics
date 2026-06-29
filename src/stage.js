const icon = (name) => {
  const icons = {
    arrow: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M6 3h7v7"/></svg>',
    menu: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
    signal: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10v3M6.5 7v6M10 4v9M13.5 1v12"/></svg>',
  }
  return icons[name]
}

const stars = (count = 36) => Array.from({ length: count }, (_, index) => {
  const x = (index * 37) % 100
  const y = 7 + ((index * 61) % 72)
  const size = index % 7 === 0 ? 2 : 1
  return `<i style="--x:${x}%;--y:${y}%;--s:${size}px;--d:${(index % 9) * -0.4}s"></i>`
}).join('')

const monolithScene = () => `
  <div class="sky-glow"></div>
  <div class="stars">${stars(42)}</div>
  <div class="ridge ridge--back"></div>
  <div class="ridge ridge--left"></div>
  <div class="ridge ridge--right"></div>
  <div class="monolith" aria-hidden="true">
    <span class="monolith__front"></span><span class="monolith__side"></span><span class="monolith__top"></span>
    <span class="monolith__core"></span>
  </div>
  <div class="water-lines">${Array.from({ length: 10 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
  <div class="reflection"></div>
`

const ribbonsScene = () => `
  <div class="stars stars--dim">${stars(24)}</div>
  <div class="ribbon-haze"></div>
  <svg class="ribbon-field" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="ribbon-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    ${Array.from({ length: 9 }, (_, i) => `<path style="--i:${i}" d="M ${80 + i * 20} 760 C ${120 + i * 52} 520, ${260 + i * 20} 420, ${365 + i * 14} -80"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<path style="--i:${i + 9}" d="M ${1120 - i * 16} 760 C ${1060 - i * 46} 530, ${860 - i * 14} 390, ${770 - i * 9} -80"/>`).join('')}
  </svg>
  <div class="ribbon-gate ribbon-gate--one"></div>
  <div class="ribbon-gate ribbon-gate--two"></div>
`

const networkScene = () => `
  <div class="stars stars--dim">${stars(32)}</div>
  <div class="network-orb"></div>
  <svg class="network-lines" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="network-glow"><feGaussianBlur stdDeviation="5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M-80 590 C230 470 350 540 600 340 C800 185 945 250 1280 80"/>
    <path d="M-40 160 C250 260 375 175 600 340 C820 500 1020 390 1260 520"/>
    <path d="M130 740 C310 520 450 490 600 340 C745 190 830 80 940-70"/>
    <path d="M1080 740 C900 540 760 480 600 340 C440 205 330 70 230-70"/>
  </svg>
  <div class="network-nodes">${Array.from({ length: 18 }, (_, i) => `<i style="--i:${i};--x:${12 + ((i * 23) % 78)}%;--y:${14 + ((i * 37) % 68)}%"></i>`).join('')}</div>
  <div class="network-rings"><i></i><i></i><i></i><i></i></div>
`

const blocksScene = () => `
  <div class="blocks-sky"></div>
  <div class="world-grid"></div>
  <div class="light-road light-road--a"></div><div class="light-road light-road--b"></div><div class="light-road light-road--c"></div>
  <div class="blocks" aria-hidden="true">
    ${Array.from({ length: 11 }, (_, i) => `<i style="--i:${i};--x:${8 + ((i * 29) % 82)}%;--z:${0.55 + (i % 4) * 0.18};--h:${36 + (i % 5) * 22}px"></i>`).join('')}
  </div>
`

const contoursScene = () => `
  <div class="contour-sky"></div>
  <svg class="contour-field" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="contour-glow"><feGaussianBlur stdDeviation="5" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    ${Array.from({ length: 12 }, (_, i) => `<path style="--i:${i}" d="M ${-140 - i * 18} ${120 + i * 34} C ${140 + i * 7} ${30 + i * 28}, ${250 + i * 20} ${400 - i * 9}, ${520 + i * 12} ${210 + i * 26} S ${940 - i * 14} ${90 + i * 30}, ${1340 + i * 8} ${250 + i * 31}"/>`).join('')}
  </svg>
  <div class="terrain terrain--near"></div><div class="terrain terrain--far"></div>
  <div class="purpose-beam"></div>
`

const cityScene = () => `
  <div class="stars">${stars(54)}</div>
  <div class="horizon-glow"></div>
  <div class="city-grid"></div>
  <div class="city-links"></div>
  <div class="city-nodes">${Array.from({ length: 46 }, (_, i) => `<i style="--i:${i};--x:${4 + ((i * 41) % 92)}%;--y:${47 + ((i * 17) % 40)}%;--h:${3 + (i % 5) * 3}px"></i>`).join('')}</div>
  <div class="final-ridge final-ridge--left"></div><div class="final-ridge final-ridge--right"></div>
  <div class="future-road"><i></i><i></i><i></i></div>
`

const sceneMarkup = {
  monolith: monolithScene,
  ribbons: ribbonsScene,
  network: networkScene,
  blocks: blocksScene,
  contours: contoursScene,
  city: cityScene,
}

export function renderStage(root, chapters) {
  const chapterControls = chapters.map((chapter, index) => `
    <li><span class="chapter-dot"></span><button type="button" data-chapter-control="${index}" ${index === 0 ? 'aria-current="step"' : ''}>${chapter.label}</button></li>
  `).join('')

  const scenes = chapters.map((chapter, index) => `
    <article class="scene scene--${chapter.scene}${index === 0 ? ' is-active' : ''}" data-scene="${index}" aria-hidden="${index !== 0}">
      ${sceneMarkup[chapter.scene]()}
    </article>
  `).join('')

  const copy = chapters.map((chapter, index) => `
    <section class="chapter-copy${index === 0 ? ' is-active' : ''}" data-copy="${index}" aria-hidden="${index !== 0}">
      <div class="chapter-copy__rule"></div>
      <h${index === 0 ? '1' : '2'}>${chapter.title}</h${index === 0 ? '1' : '2'}>
      <p>${chapter.body}</p>
      ${index === 0 || index === chapters.length - 1 ? `<a href="#experience" class="chapter-link">Explore the journey ${icon('arrow')}</a>` : ''}
    </section>
  `).join('')

  root.innerHTML = `
    <div class="loader" data-loader role="status" aria-label="Loading experience">
      <div class="loader__brand">NORTHSTAR</div>
      <div class="loader__readout"><span data-loader-percent>00</span><small>%</small></div>
      <div class="loader__segments">${Array.from({ length: 12 }, () => '<i></i>').join('')}</div>
      <span class="loader__label">Initializing horizon</span>
    </div>
    <div class="scroll-track" id="experience">
      <div class="stage" data-stage>
        <div class="stage__grain" aria-hidden="true"></div>
        <div class="stage__vignette" aria-hidden="true"></div>
        <div class="scene-stack">${scenes}</div>
        <div class="copy-stack">${copy}</div>
        <div class="hud-frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <header class="topbar">
          <a class="brand" href="#experience" aria-label="Northstar home"><span>NORTH</span><b>STAR</b></a>
          <nav aria-label="Primary navigation">
            <a href="#experience">Studio</a><a href="#experience">Places</a><a href="#experience">Journal</a>
          </nav>
          <button class="menu" type="button" aria-label="Open menu">${icon('menu')}<span>Menu</span></button>
        </header>
        <aside class="chapter-rail" aria-label="Experience chapters">
          <ol>${chapterControls}</ol>
        </aside>
        <div class="mobile-chapter"><span data-mobile-index>01</span><i></i><span>06</span></div>
        <footer class="stage-footer">
          <span class="signal">${icon('signal')} Signal live</span>
          <span class="scroll-cue"><i></i> Scroll to explore</span>
          <span class="coordinates">40.7128° N&nbsp;&nbsp;74.0060° W</span>
        </footer>
        <div class="progress" role="progressbar" aria-label="Journey progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i data-progress></i></div>
        <p class="sr-only" role="status" aria-live="polite" data-status>Vision chapter</p>
        <div class="end-mark" data-end-mark><span>NORTHSTAR / 2026</span><div><a href="#experience">IG</a><a href="#experience">LI</a><a href="#experience">BE</a></div></div>
      </div>
    </div>
  `
}
