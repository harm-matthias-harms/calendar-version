import * as core from '@actions/core'
import * as gh from '@actions/github'
import { nextVersion } from './version'
import { parseLatestVersion } from './input'

function getOctoKit () {
  const token = core.getInput('token')
  if (!token) {
    throw new Error(
      "Missing 'token' input. Make sure to provide a github token."
    )
  }
  return gh.getOctokit(token)
}

function getTagPrefix () {
  return core.getInput('tag_prefix')
}

function getRefPrefix () {
  return `tags/${getTagPrefix()}`
}

async function getLatestVersion () {
  return parseLatestVersion(getTagPrefix(), await getTags())
}

async function getTags () {
  const response = await getOctoKit().rest.git.listMatchingRefs({
    ...gh.context.repo,
    ref: getRefPrefix()
  })

  return response.data.map(({ ref }) => ref.replace('refs/tags/', ''))
}

export async function run () {
  const version = await getLatestVersion()
  const newVersion = nextVersion(version)

  const oldTag = version ? `${getTagPrefix()}${version?.toString()}` : ''
  const oldVer = version?.toString() || ''
  const newTag = `${getTagPrefix()}${newVersion}`
  const newVer = `${newVersion}`

  core.info(`Tag: ${oldTag} -> ${newTag}`)
  core.info(`Ver: ${oldVer} -> ${newVer}`)

  core.setOutput('old_tag', oldTag)
  core.setOutput('old_version', oldVer)
  core.setOutput('new_tag', newTag)
  core.setOutput('new_version', newVer)
}

run()
