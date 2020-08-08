# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [[2.0.0]](https://github.com/jorenrui/create-project/releases/tag/v2.0.0) - 2020-08-08
### Changed
- Update `useStore` hook to return only the state object and not receive any props
- Update the `useStore` hook example in README.md

### Added
- Add `useSelector` hook in which a selector function can be passed as props and return a value based on the selector
- Add GitHub Templates for Pull Requests, Feature Requests and Bug Reports
- Add `useSelector` hook to README.md

### Fixed
- Fix the `any` return value of `useStore` in TypeScript

## [[1.0.1]](https://github.com/jorenrui/create-project/releases/tag/v1.0.1) - 2020-07-28
### Added
- Add CommonJS Version
- Reduce bundle size

### Changed
- Rename dist folder to lib

### Fixed
- Fix import of ES Module

## [[1.0.0]](https://github.com/jorenrui/create-project/releases/tag/v1.0.0) - 2020-07-28
### Added
- Add `createStore` that creates a context model with `Provider` and `useStore` methods.
