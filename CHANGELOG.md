# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
Template for next version
## [Unreleased]

-->

## [Unreleased]

- [UI] node prune location (https://github.com/ohmyform/ohmyform/issues/184)
- [API] creation of new logic elements
- [API] node prune location (https://github.com/ohmyform/ohmyform/issues/184)
- Fixed typo https://github.com/ohmyform/ohmyform/pull/185
- node prune location (https://github.com/ohmyform/ohmyform/issues/184)
- use monorepo (https://github.com/ohmyform/ohmyform/pull/221)
- update to node 20 (https://github.com/ohmyform/ohmyform/issues/228)
- fix missing python error in api (https://github.com/ohmyform/ohmyform/issues/199)
- [API] fix change user role (https://github.com/ohmyform/api/pull/49)
- [API] update sqlite to 5.1.6
- [API] delete visitors on form delete (https://github.com/ohmyform/ohmyform/issues/181)
- [API] add mutation to delete submissions as form admin (https://github.com/ohmyform/ohmyform/issues/186)
- [UI] add interface to delete submissions as form admin (https://github.com/ohmyform/ohmyform/issues/186)
- [UI] update translations: hi, ja, pt_BR, uk
- make nginx listen on ipv4 and ipv6 (https://github.com/ohmyform/ohmyform/pull/232)

## [1.0.3] - 2022-03-27

- [UI] default form now has an end page
- [UI] sorting of fields in excel export
- [API] missing encode / decode for form fields within submissions (https://github.com/ohmyform/ui/commit/30ff2c96bca20c1641d9cbb96c34cce934e1afea#r68602651)
- [API] form field resolvers were missing
- [API] node-gyp update to enable build on osx 12.3
- [API] creating of new fields
- [API] notifications / hooks / pages and buttons encode and decode their ids
- [API] add start and end page to form create call
- minimal configuration example for caddy server (https://github.com/ohmyform/ohmyform/pull/167)
- [API] form hooks should only be queryable for form admins

## [1.0.2] - 2022-03-13

- [UI] field sort in excel submission export (https://github.com/ohmyform/ohmyform/issues/163)
- [API] error sending notification when field is not defined (https://github.com/ohmyform/ohmyform/issues/161)
- docker restart policy (https://github.com/ohmyform/ohmyform/issues/164)

## [1.0.1] - 2022-03-01

- [UI] map field type
- [UI] update translations (https://github.com/ohmyform/ui/pull/70)
- [UI] show warning icon in form list if not public
- [UI] default form layout is now "card"
- [UI] creating of new fields combined in new field types
- [UI] locale scripts were missing dependency
- [UI] edit user shows now email in title
- [UI] focus is now passed also do slide layout fields
- [UI] empty fields are no longer submitted
- [UI] stuttery form because of logic rerenders
- [API] allow one field nested data to be submitted
- [API] only update user fields in update mutation if they changed
- [API] form delete
- [API] field submission without value field
- [API] start using hashids to prevent insights into form ids (https://hashids.org/javascript/)

## [1.0.0] - 2022-02-28

- [UI] ability to change user passwords
- [UI] add default page background
- [UI] add environment list in [doc](doc/environment.md)
- [UI] show error message on homepage in case there is a problem with api connection
- [UI] new slider field type
- [UI] new card layout for forms
- [UI] field logic
- [UI] add environment config
- [UI] anonymous form submissions (fixes https://github.com/ohmyform/ohmyform/issues/108)
- [UI] checkbox field type (fixed https://github.com/ohmyform/ohmyform/issues/138)
- [UI] combined notificationts to become more versatile
- [UI] use exported hooks for graphql
- [UI] disable swipe gesture
- [UI] upgrade to nextjs 12
- [UI] change default value from value to defaultValue
- [UI] handle options and values as json correctly
- [UI] exclude empty submissions per default (https://github.com/ohmyform/ohmyform/issues/153)
- [UI] links at the bottom for new users
- [UI] fixes for hide contrib setting
- [UI] fix problem with node-prune on production build
- [UI] translation for prev / continue during form submission
- [UI] reload form list after adding new one (https://github.com/ohmyform/ohmyform/issues/139)
- [UI] android screen size fix (https://github.com/ohmyform/ohmyform/issues/114)
- [UI] sending finish mutation (https://github.com/ohmyform/ui/pull/67)
- [UI] fix dev documentation (https://github.com/ohmyform/ui/issues/65)
- [UI] remove next/image as it does not work with static exports (https://github.com/ohmyform/ohmyform/issues/154)
- [UI] switch back to form.prefixName (https://github.com/ohmyform/ohmyform/issues/150)
- [UI] upgrade all packages to latest versions
- [UI] upgrad all packages
- [API] logic backend components
- [API] forms now have multiple notification
- [API] layout for forms
- [API] mariadb / mysql support (fixes https://github.com/ohmyform/ohmyform/issues/143)
- [API] user confirmation tokens
- [API] email verification
- [API] idx for fields and logic to have stable order
- [API] ability to load submission by id if token is present
- [API] anonymous form submissions (fixes https://github.com/ohmyform/ohmyform/issues/108)
- [API] ability to filter for partial / completed or empty submissions
- [API] migration tests for all commits
- [API] switched from mongoose to typeorm, with support right now for postgres and sqlite
- [API] colors object removed the "colors" postfix
- [API] if unsupported database engine is used error is thrown during startup
- [API] improved eslint checks
- [API] validate submission field data and store it json encoded
- [API] forms are no longer finished on 100% but instead on finish mutation
- [API] field default value renamed from value to defaultValue
- [API] env list in doc
- [API] version env variable for yarn
- [API] path argument error (https://github.com/ohmyform/ohmyform/issues/149)
- [API] webhook and form submission (https://github.com/ohmyform/api/pull/37)
- [API] sqlite migration fixes to allow changes to tables
- [API] upgraded all packages
- switched to supervisord based combined container
- upgrade to node 16
- heroku deployments
- fix problem with node-prune on production build
- variable names in examples (https://github.com/ohmyform/ohmyform/issues/134)
- error if /run/nginx already exists (https://github.com/ohmyform/ohmyform/pull/148)
- fix combine images

## [0.9.9] - 2021-02-14

- [UI] Submission export
- [UI] Lokalize reference
- [UI] updated french translations by @Vercety87
- [UI] upgrade to node 14 (https://github.com/ohmyform/ohmyform/issues/99)
- [UI] missing dependency to @apollo/client
- [UI] footer rendering during authentication check
- [UI] authentication check for profile page
- [API] more languages
- [API] upgrade to node 14 (https://github.com/ohmyform/ohmyform/issues/99)

## [0.9.8] - 2020-09-02

- improved german translation (https://github.com/ohmyform/ui/pull/28)
- colors for landing page buttons
- menu selection type
- upgraded dependencies

## [0.9.6] - 2020-07-17

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
- minify containers to reduce layer size
- bug in settings resolver with nullable fields
- bug if user was deleted and form still exists
- do not show login note if it is not set
- typo in dropdown options https://github.com/ohmyform/ohmyform/issues/96
- query parms are not parsed https://github.com/ohmyform/ui/pull/27 https://github.com/ohmyform/ohmyform/issues/100
- errors because of missing user reference (https://github.com/ohmyform/ohmyform/issues/102)
- container now runs as non root user

## [0.9.5] - 2020-06-10

- `DEFAULT_ROLE` -> `admin` | `superuser` | `user` - with `user` being the default, making it possible that new users can create their own forms after creating
- `LOGIN_NOTE` -> markdown for Login Page, to show info text on login page
- `HIDE_CONTRIB` -> ability to hide contribution banner
- mobile improvements for lists and home page
- markdown support for page paragraphs and field description
- hideable omf badge
- login notes
- username in admin toolbar
- github stars in multiple places
- verified spanish translations https://github.com/ohmyform/ui/pull/23
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
- `export` uses now spa mode for initial loading screen
- [OMF#93](https://github.com/ohmyform/ohmyform/issues/93) dropdown options are not saved
- redirect attempts on static export
- startup error with invalid create admin config

## [0.9.3] - 2020-06-04

- nginx example
- load balanced example
- minimal example
- docker-compose mongo data dir to persist data
