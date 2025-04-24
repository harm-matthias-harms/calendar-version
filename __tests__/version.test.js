import { describe, it, expect, afterEach, vi } from 'vitest'
import { Version, parseVersion, nextVersion } from '../src/version.js'

afterEach(() => {
  vi.useRealTimers()
})

describe('parseVersion', () => {
  it('should parse a version string', () => {
    expect(parseVersion('1.02.3')).toEqual(new Version(1, 2, 3))
  })

  it('should parse invalid version strings', () => {
    expect(parseVersion('a.b.c')).toBe(null)
  })
})

describe('nextVersion', () => {
  it('should increment the year', () => {
    vi.setSystemTime(new Date(2021, 0, 1))

    expect(nextVersion(new Version(2020, 1, 3))).toEqual(new Version(2021, 1, 0))
  })
  it('should increment the month for same year', () => {
    vi.setSystemTime(new Date(2020, 1, 1))

    expect(nextVersion(new Version(2020, 1, 3))).toEqual(new Version(2020, 2, 0))
  })
  it('should increment the build version for same month', () => {
    vi.setSystemTime(new Date(2020, 2, 1))

    expect(nextVersion(new Version(2020, 3, 3))).toEqual(new Version(2020, 3, 4))
  })
})

describe('Version', () => {
  describe('toString', () => {
    it('should return a string', () => {
      expect(new Version(1, 2, 3).toString()).toBe('1.02.3')
    })
  })
  describe('sort', () => {
    it('should be 0 for same version', () => {
      expect(new Version(1, 2, 3).sort(new Version(1, 2, 3))).toEqual(0)
    })
    it('should be negative for older version', () => {
      expect(new Version(1, 2, 3).sort(new Version(1, 2, 4))).toEqual(-1)
    })
  })
})
