# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased]

### Added
### Changed
### Fixed
### Security

## [0.9.4] - 2020-06-09

### Added

- Fetch Server Settings to determine if signup is available
- `SPA` env variable to have static page with loading spinner before redirect
- `de`, `fr`, `es`, `it`, `cn` base folders for translations
- finish translating `de` and `en`
- add `yarn translation:sort` to order translations (to ensure the same order 
  when we add / change translations)
- add `yarn translation:missing <lang>` to print a list of missing translations 
  for the given language (this takes `en` as a baseline)
- travis for tests
- eslint with prettier
- `SIGNUP_DISABLED=true` to prevent users from signing up 

### Changed

- `export` uses now spa mode for initial loading screen

### Fixed

- [OMF#93](https://github.com/ohmyform/ohmyform/issues/93) dropdown options are not saved
- redirect attempts on static export
- startup error with invalid create admin config

## [0.9.3] - 2020-06-04

### Added

- nginx example
- load balanced example
- minimal example

### Fixed

- docker-compose mongo data dir to persist data
