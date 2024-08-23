import { Version, parseVersion } from './version'

export function parseLatestVersion (prefix, tags) {
  return tags.filter(tag => tag.startsWith(prefix))
    .map(t => t.replace(prefix, ''))
    .map(parseVersion)
    .filter(version => version !== null)
    .reduce((a, b) => (a.sort(b) > 0 ? a : b), new Version(0, 0))
}
