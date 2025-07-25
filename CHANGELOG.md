# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-07-25

### Fixed

- **Layout Issues**: Fixed line numbers and code not staying on same line
- **CSS Dependencies**: Added all necessary Tailwind-equivalent styles
- **Package Integration**: Demo now uses actual built package
- **Build System**: CSS properly copied to dist folder
- **TypeScript Errors**: Cleaned up reference file

### Added

- **GitHub Pages Deployment**: Automated deployment with GitHub Actions
- **Production Demo**: Live demo at https://aashishsinghal.github.io/render-diff-react/
- **Deployment Scripts**: Local and automated deployment options
- **Layout CSS**: Complete set of layout utilities (flex, spacing, typography)
- **Zero Dependencies**: Self-contained component with no external CSS framework

## [1.0.0] - 2024-07-25

### Added

- Initial release of render-diff-react
- Beautiful React component for rendering Git diffs with syntax highlighting
- Extensive customization options with 20+ styling props
- Complete theme system for color customization
- Syntax highlighting support for all languages supported by refractor
- Display controls (show/hide line numbers, headers, syntax highlighting)
- Responsive design that works on all screen sizes
- TypeScript support with comprehensive type definitions
- Custom diff implementation to eliminate external dependencies
- Multiple CSS import options for syntax highlighting styles
- Comprehensive documentation with examples
- MIT license

### Features

- **Customization**: 20+ className props for complete styling control
- **Theming**: Full color customization for all elements
- **Syntax Highlighting**: Configurable language support
- **Display Options**: Show/hide various elements
- **Responsive**: Works on desktop and mobile
- **Lightweight**: Zero external dependencies for diff functionality
- **TypeScript**: Full type support
- **Accessibility**: Proper ARIA attributes and keyboard navigation

### Technical Details

- Custom word-level diff implementation
- Built-in CSS styles for syntax highlighting
- Custom SVG icons (no external icon dependencies)
- Multiple output formats (CommonJS, ESM)
- Rollup build system
- Comprehensive TypeScript definitions
