# GitHub license check [![Build Status](https://travis-ci.org/k-nut/github-license-check.svg?branch=master)](https://travis-ci.org/k-nut/github-license-check)

A small single page app that uses GitHub's new [license api](https://developer.github.com/v3/licenses/) to check
which of your repositories are missing a license.

It is made with vuejs and requires no backend. This has the upside of easier deployment but the problem that it is limited to 
60 requests per hour and IP-address because it is using the unauthenticated api.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload on localhost
npm run dev

# build for production with minification
npm run build

```

## Remarks
Halfway thought building this I discovered [license-checker](http://dschep.github.io/license-checker/) by dschep which 
does pretty much the same thing but does not use the new api yet (because it did not exist when he made it).

Using the GitHub license api has the advantage of not having to check for licenses manually and also getting information about the 
type of the license.
