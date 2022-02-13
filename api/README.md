# OhMyForm API 

[![Build Status](https://travis-ci.org/ohmyform/api.svg?branch=master)](https://travis-ci.org/ohmyform/api)
![Latest Release](https://badgen.net/github/tag/ohmyform/api)
[![Docker Pulls](https://badgen.net/docker/pulls/ohmyform/api)](https://hub.docker.com/r/ohmyform/api)
[![Lokalise](https://badgen.net/badge/Lokalise/EN/green?icon=libraries)](https://app.lokalise.com/public/379418475ede5d5c6937b0.31012044/)
![Last Commit](https://badgen.net/github/last-commit/ohmyform/api)

[Demo](https://demo.ohmyform.com/login)

> An *open source alternative to TypeForm* that can create stunning mobile-ready forms, surveys and questionnaires.

[![Discord](https://img.shields.io/discord/595773457862492190.svg?label=Discord%20Chat)](https://discord.gg/MJqAuAZ)
[![Financial Contributors on Open Collective](https://opencollective.com/ohmyform-sustainability/all/badge.svg?label=financial+contributors)](https://opencollective.com/ohmyform-sustainability)

## Description

[OhMyForm](https://github.com/ohmyform) api backend

All calls to the api are through GraphQL, with the endpoint 
providing an introspectable schema at `GET /graphql`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
