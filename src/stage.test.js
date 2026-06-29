// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { chapters } from './content.js'
import { renderStage } from './stage.js'

describe('renderStage', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>'
  })

  it('renders the cinematic shell and every chapter', () => {
    renderStage(document.querySelector('#app'), chapters)

    expect(document.querySelector('[aria-label="Northstar home"]')).not.toBeNull()
    expect(document.querySelector('[aria-label="Primary navigation"]')).not.toBeNull()
    expect(document.querySelectorAll('[data-chapter-control]')).toHaveLength(6)
    expect(document.querySelectorAll('[data-scene]')).toHaveLength(6)
    expect(document.querySelectorAll('[data-copy]')).toHaveLength(6)
    expect(document.querySelector('[role="progressbar"]')).not.toBeNull()
    expect(document.querySelector('[role="status"]')).not.toBeNull()
  })

  it('marks the first chapter as the initial active state', () => {
    renderStage(document.querySelector('#app'), chapters)

    expect(document.querySelector('[data-chapter-control="0"]').getAttribute('aria-current')).toBe('step')
    expect(document.querySelector('[data-scene="0"]').classList.contains('is-active')).toBe(true)
    expect(document.querySelector('[data-copy="0"]').classList.contains('is-active')).toBe(true)
  })
})
