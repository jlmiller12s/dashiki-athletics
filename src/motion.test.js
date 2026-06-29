// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { chapters } from './content.js'
import { renderStage } from './stage.js'
import { chapterIndexFromProgress, getMotionMode, setChapterState } from './motion.js'

describe('motion model', () => {
  it('maps normalized progress to a clamped chapter index', () => {
    expect(chapterIndexFromProgress(-1, 6)).toBe(0)
    expect(chapterIndexFromProgress(0, 6)).toBe(0)
    expect(chapterIndexFromProgress(0.2, 6)).toBe(1)
    expect(chapterIndexFromProgress(0.5, 6)).toBe(3)
    expect(chapterIndexFromProgress(1, 6)).toBe(5)
    expect(chapterIndexFromProgress(4, 6)).toBe(5)
  })

  it('chooses reduced, compact, and desktop modes predictably', () => {
    expect(getMotionMode({ width: 1440, reducedMotion: true, coarsePointer: false })).toBe('reduced')
    expect(getMotionMode({ width: 600, reducedMotion: false, coarsePointer: false })).toBe('compact')
    expect(getMotionMode({ width: 1440, reducedMotion: false, coarsePointer: true })).toBe('compact')
    expect(getMotionMode({ width: 1440, reducedMotion: false, coarsePointer: false })).toBe('desktop')
  })
})

describe('setChapterState', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>'
    renderStage(document.querySelector('#app'), chapters)
  })

  it('updates scene, copy, rail, mobile index, and live status', () => {
    setChapterState(document, 3, chapters)

    expect(document.querySelector('[data-scene="3"]').classList.contains('is-active')).toBe(true)
    expect(document.querySelector('[data-copy="3"]').getAttribute('aria-hidden')).toBe('false')
    expect(document.querySelector('[data-chapter-control="3"]').getAttribute('aria-current')).toBe('step')
    expect(document.querySelector('[data-mobile-index]').textContent).toBe('04')
    expect(document.querySelector('[data-status]').textContent).toContain('Craft')
  })
})
