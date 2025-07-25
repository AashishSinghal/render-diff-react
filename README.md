# Render Diff React

<div align="center">
  <img src="https://img.shields.io/npm/v/render-diff-react.svg" alt="npm version" />
  <img src="https://img.shields.io/npm/l/render-diff-react.svg" alt="license" />
  <img src="https://img.shields.io/npm/dm/render-diff-react.svg" alt="downloads" />
  <img src="https://img.shields.io/bundlephobia/min/render-diff-react.svg" alt="bundle size" />
</div>

<br />

<div align="center">
  <h3>A beautiful and customizable React component for rendering Git diffs with syntax highlighting</h3>
  <p>Display Git diffs with beautiful syntax highlighting, extensive customization options, and zero external dependencies for diff functionality</p>
</div>

<br />

<div align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#examples">Examples</a> •
  <a href="#technical-details">Technical Details</a> •
  <a href="#license">License</a>
</div>

<br />

## Features

- 🎨 **Beautiful UI**: GitHub-style diff rendering with clean, modern design
- 🔧 **Highly Customizable**: Extensive theming and styling options
- 📝 **Syntax Highlighting**: Built-in syntax highlighting for code changes
- 📱 **Responsive**: Works great on desktop and mobile devices
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions
- ⚡ **Ultra Lightweight**: Zero external dependencies for diff functionality and icons, optimized performance
- 🎨 **Theme Support**: Customizable colors and styling
- 🔧 **Flexible**: Show/hide various elements and customize behavior

## Installation

```bash
npm install render-diff-react
# or
yarn add render-diff-react
# or
pnpm add render-diff-react
```

### CSS Styles

The package includes CSS styles for syntax highlighting. You have several options to include them:

#### Option 1: Import CSS file

```css
/* Import the styles in your CSS file */
@import "render-diff-react/src/styles.css";
```

#### Option 2: Import in JavaScript/TypeScript

```javascript
// Import in your JavaScript/TypeScript file
import "render-diff-react/src/styles.css";
```

#### Option 3: Programmatic injection

```javascript
import { injectSyntaxHighlightingStyles } from "render-diff-react";

// Call this function once in your app
injectSyntaxHighlightingStyles();
```

#### Option 4: Manual CSS injection

```javascript
import { syntaxHighlightingCSS } from "render-diff-react";

// Inject the CSS manually
const style = document.createElement("style");
style.textContent = syntaxHighlightingCSS;
document.head.appendChild(style);
```

## Quick Start

```tsx
import { DiffViewer } from "render-diff-react";

function App() {
  const gitDiff = `
diff --git a/src/App.tsx b/src/App.tsx
index 1234567..abcdefg 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,3 +1,4 @@
 import React from 'react';
+import { useState } from 'react';
 
 function App() {
-  return <div>Hello World</div>;
+  const [count, setCount] = useState(0);
+  return <div>Hello World {count}</div>;
 }
`;

  return (
    <div>
      <h1>My Git Diff</h1>
      <DiffViewer patch={gitDiff} />
    </div>
  );
}
```

## Props

### Required Props

| Prop    | Type     | Description                         |
| ------- | -------- | ----------------------------------- |
| `patch` | `string` | The Git diff patch string to render |

### Optional Props

#### Display Options

| Prop                       | Type      | Default        | Description                                 |
| -------------------------- | --------- | -------------- | ------------------------------------------- |
| `showLineNumbers`          | `boolean` | `true`         | Whether to show line numbers                |
| `showFileHeader`           | `boolean` | `true`         | Whether to show the file header             |
| `showHunkHeaders`          | `boolean` | `true`         | Whether to show the hunk headers            |
| `enableSyntaxHighlighting` | `boolean` | `true`         | Whether to enable syntax highlighting       |
| `syntaxHighlightLanguage`  | `string`  | `"typescript"` | The language to use for syntax highlighting |

#### Styling Props

| Prop                        | Type     | Description                                      |
| --------------------------- | -------- | ------------------------------------------------ |
| `className`                 | `string` | Custom CSS classes for the main container        |
| `fileClassName`             | `string` | Custom CSS classes for the file container        |
| `fileHeaderClassName`       | `string` | Custom CSS classes for the file header           |
| `fileNameClassName`         | `string` | Custom CSS classes for the file name             |
| `additionsClassName`        | `string` | Custom CSS classes for the additions count       |
| `deletionsClassName`        | `string` | Custom CSS classes for the deletions count       |
| `splitViewClassName`        | `string` | Custom CSS classes for the split view container  |
| `codeLineClassName`         | `string` | Custom CSS classes for the code lines            |
| `lineNumberClassName`       | `string` | Custom CSS classes for the line numbers          |
| `hunkHeaderClassName`       | `string` | Custom CSS classes for the hunk header           |
| `hunkContentClassName`      | `string` | Custom CSS classes for the hunk content          |
| `addedLineClassName`        | `string` | Custom CSS classes for added lines               |
| `deletedLineClassName`      | `string` | Custom CSS classes for deleted lines             |
| `contextLineClassName`      | `string` | Custom CSS classes for context lines             |
| `prefixClassName`           | `string` | Custom CSS classes for the prefix (+/-/space)    |
| `codeContentClassName`      | `string` | Custom CSS classes for the code content          |
| `highlightAddedClassName`   | `string` | Custom CSS classes for highlighted additions     |
| `highlightDeletedClassName` | `string` | Custom CSS classes for highlighted deletions     |
| `tokenClassName`            | `string` | Custom CSS classes for syntax highlighted tokens |
| `tokenTextClassName`        | `string` | Custom CSS classes for text tokens               |

#### Theme Props

| Prop                                    | Type     | Description                                |
| --------------------------------------- | -------- | ------------------------------------------ |
| `theme.backgroundColor`                 | `string` | Background color for the main container    |
| `theme.borderColor`                     | `string` | Border color for file containers           |
| `theme.fileHeaderBackgroundColor`       | `string` | Background color for file headers          |
| `theme.fileNameColor`                   | `string` | Text color for file names                  |
| `theme.additionsColor`                  | `string` | Text color for additions count             |
| `theme.deletionsColor`                  | `string` | Text color for deletions count             |
| `theme.splitViewBackgroundColor`        | `string` | Background color for the split view        |
| `theme.lineNumberColor`                 | `string` | Text color for line numbers                |
| `theme.codeColor`                       | `string` | Text color for code content                |
| `theme.addedLineBackgroundColor`        | `string` | Background color for added lines           |
| `theme.deletedLineBackgroundColor`      | `string` | Background color for deleted lines         |
| `theme.hunkHeaderBackgroundColor`       | `string` | Background color for hunk headers          |
| `theme.hunkHeaderColor`                 | `string` | Text color for hunk headers                |
| `theme.highlightAddedBackgroundColor`   | `string` | Background color for highlighted additions |
| `theme.highlightDeletedBackgroundColor` | `string` | Background color for highlighted deletions |

## Styling

The component comes with built-in styles that work out of the box. For syntax highlighting to work properly, you need to import the CSS styles:

```css
/* Import the syntax highlighting styles */
@import "render-diff-react/src/styles.css";
```

The component uses a dark theme by default, similar to GitHub's diff view. You can customize all colors and styles using the `theme` prop and various className props.

## Examples

### Basic Usage

```tsx
import { DiffViewer } from "render-diff-react";

function BasicExample() {
  const diff = `diff --git a/file.js b/file.js
index 1234567..abcdefg 100644
--- a/file.js
+++ b/file.js
@@ -1,3 +1,4 @@
 function hello() {
-  console.log("Hello");
+  console.log("Hello World");
+  return true;
 }
`;

  return <DiffViewer patch={diff} />;
}
```

### Custom Styling

```tsx
import { DiffViewer } from "render-diff-react";

function CustomStylingExample() {
  return (
    <DiffViewer
      patch={diff}
      className="my-custom-diff"
      fileClassName="border-2 border-blue-500"
      theme={{
        backgroundColor: "#1a1a1a",
        borderColor: "#404040",
        fileNameColor: "#ffffff",
        additionsColor: "#4ade80",
        deletionsColor: "#f87171",
      }}
    />
  );
}
```

### Disable Features

```tsx
import { DiffViewer } from "render-diff-react";

function MinimalExample() {
  return (
    <DiffViewer
      patch={diff}
      showLineNumbers={false}
      showFileHeader={false}
      showHunkHeaders={false}
      enableSyntaxHighlighting={false}
    />
  );
}
```

### Custom Syntax Highlighting

```tsx
import { DiffViewer } from "render-diff-react";

function PythonExample() {
  return <DiffViewer patch={pythonDiff} syntaxHighlightLanguage="python" />;
}
```

## Supported Languages

The component supports syntax highlighting for all languages supported by [refractor](https://github.com/wooorm/refractor), including:

- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- PHP
- Ruby
- And many more...

## Browser Support

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Aashish Singhal](https://github.com/AashishSinghal)

## Technical Details

### Custom Diff Implementation

This package includes a custom word-level diff implementation that eliminates the need for external diff libraries. The implementation:

- Splits text by words and spaces for accurate diffing
- Provides the same API as the original `diff` package
- Reduces bundle size by ~50KB
- Eliminates external dependencies for diff functionality

### Dependencies

- **refractor**: For syntax highlighting
- **react**: Peer dependency
- **react-dom**: Peer dependency

### Custom Icons

The package includes custom SVG icons instead of external icon libraries:

- **FileTextIcon**: For file headers
- **ChevronsUpDownIcon**: For hunk headers

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Syntax highlighting powered by [refractor](https://github.com/wooorm/refractor)
- Custom SVG icons for minimal dependencies
- Custom diff implementation for optimal performance
