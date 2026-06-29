import { describe, expect, it } from 'vitest'
import { chapters } from './content.js'

describe('chapters', () => {
  it('defines six complete chapters in order', () => {
    expect(chapters).toHaveLength(6)
    expect(chapters.map((chapter) => chapter.label)).toEqual([
      'Vision',
      'Momentum',
      'Network',
      'Craft',
      'Purpose',
      'Horizon',
    ])

    chapters.forEach((chapter, index) => {
      expect(chapter.id).toBe(index + 1)
      expect(chapter.title.length).toBeGreaterThan(12)
      expect(chapter.body.length).toBeGreaterThan(60)
      expect(chapter.scene).toMatch(/^[a-z-]+$/)
    })
  })
})
