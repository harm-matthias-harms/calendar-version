# Calender Version

Dead simple GitHub action to calculate the next calendar based release version `YYYY.MM.build`, e.g. `2024.01.17`.

Good if you want to use calendar based versioning with other actions, such as:

- <https://github.com/release-drafter/release-drafter>
- <https://github.com/elgohr/Github-Release-Action>
- <https://github.com/softprops/action-gh-release#inputs>

## Example

```yaml
name: Release Drafter

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, reopened, synchronize, edited]

jobs:
  update_release_draft:
    permissions:
      # write permission is required to create a github release
      contents: write
      # write permission is required for autolabeler
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: Calendar Version
        id: calendar-version
        uses: harm-matthias-harms/calendar-version@v0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - uses: release-drafter/release-drafter@v6
        with:
          tag: ${{ steps.calendar-version.outputs.new-tag }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input        | Description                                  | Default |
| ------------ | -------------------------------------------- | ------- |
| `token`      | The GitHub token                             | None    |
| `tag-prefix` | A tag prefix, e.g. `v` leads to `v2024.01.17` | `""`    |

## Outputs

| Output        | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| `old-tag`     | The highest version tag, prefix with `tag-prefix`, found in the repository. |
| `old-version` | The highest version, found in the repository.                               |
| `new-tag`     | The next version tag, prefix with `tag-prefix`.                             |
| `new-version` | The next version, based on the `old-version` and current date.              |

## Attributions

Based on the awesome work of <https://github.com/egoodhall/calver>, just with focused functionality and more automation.
