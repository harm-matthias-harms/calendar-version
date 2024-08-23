# Calender Version

Dead simple GitHub action to calculate the next calendar based release version `YYYY.M.build`, e.g. `2024.1.17`.

Good if you want to use calendar based versioning with other actions, such as:

- <https://github.com/release-drafter/release-drafter>
- <https://github.com/elgohr/Github-Release-Action>
- <https://github.com/softprops/action-gh-release#inputs>

## Inputs

| Input        | Description                                  | Default |
| ------------ | -------------------------------------------- | ------- |
| `token`      | The GitHub token                             | None    |
| `tag_prefix` | A tag prefix, e.g. `v` leads to `v2024.1.17` | `""`    |

## Outputs

| Output        | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| `old_tag`     | The highest version tag, prefix with `tag_prefix`, found in the repository. |
| `old_version` | The highest version, found in the repository.                               |
| `new_tag`     | The next version tag, prefix with `tag_prefix`.                             |
| new_version   | The next version, based on the `old_version` and current date.              |

## Attributions

Based on the awesome work of <https://github.com/egoodhall/calver>, just with focused functionality and more automation.
