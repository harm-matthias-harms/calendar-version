import { describe, it, expect } from 'vitest'
import { parseLatestVersion } from '../src/input.js'
import { Version } from '../src/version.js'

describe('parseLatestVersion', () => {
  it('returns latest version for tags', () => {
    expect(parseLatestVersion('', ['1.0.0', '1.0.1', '1.1.0', '1.02.0'])).toEqual(new Version(1, 2, 0))
  })
  it('filters tags by prefix', () => {
    expect(parseLatestVersion('v', ['v1.0.0', '1.0.1', '1.1.0'])).toEqual(new Version(1, 0, 0))
  })
  it('handles invalid tags', () => {
    expect(parseLatestVersion('', ['1.0.0', '1.0.1', '1.01.1', '1.1', 'invalid'])).toEqual(new Version(1, 1, 1))
  })
  it('returns latest version for empty list of tags', () => {
    expect(parseLatestVersion('', [])).toEqual(new Version(0, 0, 0))
  })
})
