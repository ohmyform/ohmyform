# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased]

### Added

### Changed

### Fixed

### Security

## [0.9.9] - 2021-02-14

### Added

- Submission export
- Lokalize reference
- more languages

### Changed

- updated french translations by @Vercety87
- upgrade to node 14 (https://github.com/ohmyform/ohmyform/issues/99)

### Fixed

- missing dependency to @apollo/client
- footer rendering during authentication check

### Security

- authentication check for profile page

## [0.9.8] - 2020-09-02

### Changed

- improved german translation (https://github.com/ohmyform/ui/pull/28)

### Fixed

- colors for landing page buttons
- menu selection type

### Security

- upgraded dependencies

## [0.9.6] - 2020-07-17

### Added

- slug for fields to be able to set value by url parameter
- form submission hokks
- default index.html for api without bundled ui
- slug for form fields can now be saved
- submission webhooks with ability to customize json payload
  ```
  {
    form: ID
    submission: ID
    created: DateTime
    lastModified: DateTime
    fields: [
        {
            field: ID
            slug: String
            value: any
        }
    ]
  }
  ```
  
### Changed

- minify containers to reduce layer size

### Fixed

- bug in settings resolver with nullable fields
- bug if user was deleted and form still exists
- do not show login note if it is not set
- typo in dropdown options https://github.com/ohmyform/ohmyform/issues/96
- query parms are not parsed https://github.com/ohmyform/ui/pull/27 https://github.com/ohmyform/ohmyform/issues/100
- errors because of missing user reference (https://github.com/ohmyform/ohmyform/issues/102)

### Security

- container now runs as non root user

## [0.9.5] - 2020-06-10
 
### Added

- `DEFAULT_ROLE` -> `admin` | `superuser` | `user` - with `user` being the default, making it possible that new users can create their own forms after creating
- `LOGIN_NOTE` -> markdown for Login Page, to show info text on login page
- `HIDE_CONTRIB` -> ability to hide contribution banner
- mobile improvements for lists and home page
- markdown support for page paragraphs and field description
- hideable omf badge
- login notes
- username in admin toolbar
- github stars in multiple places

### Changed

- verified spanish translations https://github.com/ohmyform/ui/pull/23

### Fixed

- di on setting resolver, prevented signup settings to be visible in ui
- return admin of form also for admins
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
