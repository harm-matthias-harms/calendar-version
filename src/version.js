const VERSION_PATTER = /(\d+)\.(\d+)\.(\d+)/

export class Version {
  constructor (year, month, build = 0) {
    this.year = year
    this.month = month
    this.build = build
  }

  toString () {
    return `${this.year}.${this.month}.${this.build}`
  }

  isSameRelease (other) {
    return this.year === other.year && this.month === other.month
  }

  incrementBuild () {
    return new Version(this.year, this.month, this.build + 1)
  }

  sort (other) {
    return (
      this.year - other.year ||
      this.month - other.month ||
      this.build - other.build
    )
  }
}

export function parseVersion (version) {
  const match = VERSION_PATTER.exec(version)
  return match ? new Version(...match.slice(1, 4).map(Number)) : null
}

export function nextVersion (currentVersion) {
  const now = new Date()
  const latestRelease = new Version(now.getFullYear(), now.getMonth() + 1)
  return currentVersion?.isSameRelease(latestRelease)
    ? currentVersion.incrementBuild()
    : latestRelease
}
