// CSS styles for syntax highlighting
export const syntaxHighlightingCSS = `
/* Syntax highlighting styles for render-diff-react */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a9955;
}

.token.punctuation {
  color: #d4d4d4;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #b5cea8;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #ce9178;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #d4d4d4;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #569cd6;
}

.token.function,
.token.class-name {
  color: #dcdcaa;
}

.token.regex,
.token.important,
.token.variable {
  color: #9cdcfe;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
`;

// Function to inject CSS styles into the document
export function injectSyntaxHighlightingStyles(): void {
  if (typeof document !== "undefined") {
    const styleId = "render-diff-react-syntax-highlighting";

    // Check if styles are already injected
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = syntaxHighlightingCSS;
    document.head.appendChild(style);
  }
}
