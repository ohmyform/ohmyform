# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## UNRELEASED

### Added

- ability to change user passwords
- add default page background
- add environment list in [doc](doc/environment.md)
- show error message on homepage in case there is a problem with api connection
- new slider field type
- new card layout for forms
- field logic
- add enviroment config
- anonymous form submissions (fixes https://github.com/ohmyform/ohmyform/issues/108)
- checkbox field type (fixed https://github.com/ohmyform/ohmyform/issues/138)

### Changed

- combined notificationts to become more versatile
- use exported hooks for graphql
- disable swipe gesture
- upgrade to nextjs 12

### Fixed

- links at the bottom for new users
- fixes for hide contrib setting
- fix problem with node-prune on production build
- translation for prev / continue during form submission
- reload form list after adding new one (https://github.com/ohmyform/ohmyform/issues/139)
- android screen size fix (https://github.com/ohmyform/ohmyform/issues/114)

### Security

- upgrad all packages

## [0.9.9] - 2021-02-14

### Added

- Submission export
- Lokalize reference

### Changed

- updated french translations by @Vercety87
- upgrade to node 14 (https://github.com/ohmyform/ohmyform/issues/99)

### Fixed

- missing dependency to @apollo/client
- footer rendering during authentication check

### Security

- authentication check for profile page
 
## [0.9.8] - 2020-09-02

### Fixed

- menu selection type

### Security
 
## [0.9.7] - 2020-09-02

### Changed

- improved german translation (https://github.com/ohmyform/ui/pull/28)

### Fixed

- colors for landing page buttons

### Security

- upgraded dependencies
 
## [0.9.6] - 2020-07-17

### Added

- slug for fields to be able to set value by url parameter
- form submission hokks

### Changed

- minify containers to reduce layer size

### Fixed

- do not show login note if it is not set
- typo in dropdown options https://github.com/ohmyform/ohmyform/issues/96
- query parms are not parsed https://github.com/ohmyform/ui/pull/27 https://github.com/ohmyform/ohmyform/issues/100
- errors because of missing user reference (https://github.com/ohmyform/ohmyform/issues/102)

### Security

- container now runs as non root user
 
## [0.9.5] - 2020-06-10

### Added

- mobile improvements for lists and home page
- markdown support for page paragraphs and field description
- hideable omf badge
- login notes
- username in admin toolbar
- github stars in multiple places

### Changed

- verified spanish translations https://github.com/ohmyform/ui/pull/23

### Fixed

- yes / no field fixed on admin and user view
- prev property error on div
- rating field default on admin
- number field defaults
- translations for field validation
- number validation
- side menu only shows accessible entries
 
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

### Changed

- `export` uses now spa mode for initial loading screen

### Fixed

- [OMF#93](https://github.com/ohmyform/ohmyform/issues/93) dropdown options are not saved
- redirect attempts on static export
 
## [0.9.2] - 2020-06-04

### Fixed
 
- type error
 
## [0.9.1] - 2020-06-02
 
### Added
- radio fields
- dropdown fields
- min and max for date fields
- logout on home screen
- translation system

### Fixed

- initial Page is now correct also in SPA mode
- initial value for form adding
- anonymous submission of forms

