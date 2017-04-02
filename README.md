# Github license check [![Build Status](https://travis-ci.org/k-nut/github-license-checker.svg?branch=master)](https://travis-ci.org/k-nut/github-license-checker)

A small single page app that uses GitHub's new [license api](https://developer.github.com/v3/licenses/) to check
which of your repositories are missing a license.

It is made with vuejs and requires no backend. This has the upside of easier deployment but the problem that it is limited to 
60 requests per hoour and IP-address because it is using the unauthenticated api.

## Build Setup

``` bash
# install dependencies
yarn install # or npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
