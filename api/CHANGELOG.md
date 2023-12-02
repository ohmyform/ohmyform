# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
Template for next version
## [Unreleased]

### Added

### Changed

### Fixed

### Security
-->

## [Unreleased]

### Added

### Changed

### Fixed

- creation of new logic elements
- node prune location (https://github.com/ohmyform/ohmyform/issues/184)

### Security

## [1.0.3] - 2022-03-27

### Added

- add start and end page to form create call

### Changed

- notifications / hooks / pages and buttons encode and decode their ids

### Fixed

- missing encode / decode for form fields within submissions (https://github.com/ohmyform/ui/commit/30ff2c96bca20c1641d9cbb96c34cce934e1afea#r68602651)
- form field resolvers were missing
- node-gyp update to enable build on osx 12.3
- creating of new fields

### Security

- form hooks should only be queryable for form admins

## [1.0.2] - 2022-03-13

### Fixed

- error sending notification when field is not defined (https://github.com/ohmyform/ohmyform/issues/161)

## [1.0.1] - 2022-03-01

### Added

- allow one field nested data to be submitted

### Fixed

- only update user fields in update mutation if they changed
- form delete
- field submission without value field

### Security

- start using hashids to prevent insights into form ids (https://hashids.org/javascript/)

## [1.0.0] - 2022-02-28

### Added

- logic backend components
- forms now have multiple notification
- layout for forms
- mariadb / mysql support (fixes https://github.com/ohmyform/ohmyform/issues/143)
- user confirmation tokens
- email verification
- idx for fields and logic to have stable order
- ability to load submission by id if token is present
- anonymous form submissions (fixes https://github.com/ohmyform/ohmyform/issues/108)
- ability to filter for partial / completed or empty submissions
- migration tests for all commits

### Changed

- switched from mongoose to typeorm, with support right now for postgres and sqlite
- colors object removed the "colors" postfix
- if unsupported database engine is used error is thrown during startup
- improved eslint checks
- validate submission field data and store it json encoded
- forms are no longer finished on 100% but instead on finish mutation
- field default value renamed from value to defaultValue

### Fixed

- env list in doc
- version env variable for yarn
- path argument error (https://github.com/ohmyform/ohmyform/issues/149)
- webhook and form submission (https://github.com/ohmyform/api/pull/37)
- sqlite migration fixes to allow changes to tables

### Security

- upgraded all packages

## [0.9.9] - 2021-02-14

### Added

- more languages

### Changed

- upgrade to node 14 (https://github.com/ohmyform/ohmyform/issues/99)

### Fixed

### Security

## [0.9.7] - 2020-09-02

### Added

### Changed

### Fixed

### Security

- upgraded dependencies
 
## [0.9.6] - 2020-07-17

### Added

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

### Security

- container now runs as non root user

## [0.9.5] - 2020-06-10
 
### Added

- `DEFAULT_ROLE` -> `admin` | `superuser` | `user` - with `user` being the default, making it possible that new users can create their own forms after creating
- `LOGIN_NOTE` -> markdown for Login Page, to show info text on login page
- `HIDE_CONTRIB` -> ability to hide contribution banner

### Fixed

- di on setting resolver, prevented signup settings to be visible in ui
- return admin of form also for admins

## [0.9.4] - 2020-06-09
 
### Added

- `SIGNUP_DISABLED=true` to prevent users from signing up 
- travis lints

### Fixed

- startup error with invalid create admin config

## [0.9.2]

### Security

- update apollo-server for https://github.com/advisories/GHSA-w42g-7vfc-xf37
 
## [0.9.1] - 2020-06-02

### Added

- form field options
- form field rating settings
- form field logic jump settings

### Changed

- improved documentation
- Installation Metrics

### Fixed

- anonymous submission of forms
