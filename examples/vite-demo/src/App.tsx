import React, { useState } from "react";
import { DiffViewer, injectSyntaxHighlightingStyles } from "render-diff-react";
import "render-diff-react/dist/styles.css";
import "./App.css";

// Inject syntax highlighting styles
injectSyntaxHighlightingStyles();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("basic");

  // Example diffs
  const basicDiff = `
  diff --git a/tests/session.spec.ts b/tests/session.spec.ts
index 8b3f0f79d..9670f7c7e 100644
--- a/tests/session.spec.ts
+++ b/tests/session.spec.ts
@@ -1,26 +1,44 @@
 import { test, expect } from "./fixtures";
 
 test.skip("should be able to create a new session", async ({ loggedInPage }) => {
+  // Navigate to Sessions page
   await loggedInPage.getByRole('link', { name: 'Sessions', exact: true }).click();
   await loggedInPage.getByRole('button', { name: 'New' }).click();
+  // Create a new session with default settings
   await loggedInPage.getByRole('button', { name: 'Create' }).click();
-  await loggedInPage.getByPlaceholder('Type your message...').click();
+  await loggedInPage.getByPlaceholder('Type your message<>test...').click();
   await loggedInPage.getByPlaceholder('Type your message...').fill("list all the files in the current dir");
+  // Send the message and wait for response
   await loggedInPage.getByRole('button', { name: 'Send' }).click();
   await expect(loggedInPage.getByText('Assistant')).toBeVisible({ timeout: 60000 });
 });
 
 test.skip("should be able to create a new session with claude model and wait for tool message", async ({ loggedInPage }) => {
+  // Navigate to Sessions page and start creating new session
   await loggedInPage.getByRole('link', { name: 'Sessions', exact: true }).click();
   await loggedInPage.getByRole('button', { name: 'New' }).click();
   // Select Claude model
   await loggedInPage.getByRole('combobox').click();
   // Click the current model name (default GPT-3.5 Turbo) to open dropdown
   await loggedInPage.getByRole('option', { name: 'Claude Sonnet 3.7', exact: true }).click();
+  // Create the session with Claude model selected
   await loggedInPage.getByRole('button', { name: 'Create' }).click(); // Create the session
   await loggedInPage.getByPlaceholder('Type your message...').click();
   await loggedInPage.getByPlaceholder('Type your message...').fill("list all the files in the current dir and tell me their sizes");
+  // Send message and wait for tool execution results
   await loggedInPage.getByRole('button', { name: 'Send' }).click();
   // Wait for a message containing "tool" (case-insensitive)
   await expect(loggedInPage.getByText('Show Result')).toBeVisible({ timeout: 60000 });
 });
+
+test("dummy test for verification", async ({ loggedInPage }) => {
+  // This is a dummy test added for demonstration purposes
+  // It simply verifies that the logged in page loads correctly
+  await expect(loggedInPage).toHaveTitle(/Empirical/);
+  
+  // Check if the main navigation is visible
+  await expect(loggedInPage.getByRole('link', { name: 'Sessions', exact: true })).toBeVisible();
+  
+  // This test serves as a basic smoke test
+  console.log("Dummy test executed successfully");
+});
`;

  const pythonDiff = `diff --git a/main.py b/main.py
index abc123..def456 100644
--- a/main.py
+++ b/main.py
@@ -1,5 +1,6 @@
 def greet(name):
-    print(f"Hello, {name}!")
+    return f"Hello, {name}!"
 
 def main():
-    greet("World")
+    message = greet("World")
+    print(message)
`;

  const complexDiff = `diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index 789abc..def123 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -1,15 +1,25 @@
 import React from 'react';
 
-interface ButtonProps {
+interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
-  onClick?: () => void;
+  variant?: 'primary' | 'secondary' | 'outline';
+  size?: 'sm' | 'md' | 'lg';
+  disabled?: boolean;
 }
 
-export function Button({ children, onClick }: ButtonProps) {
+export function Button({ 
+  children, 
+  variant = 'primary',
+  size = 'md',
+  disabled = false,
+  className,
+  ...props 
+}: ButtonProps) {
   return (
     <button
-      onClick={onClick}
-      className="px-4 py-2 bg-blue-500 text-white rounded"
+      disabled={disabled}
+      className={\`btn btn-\${variant} btn-\${size} \${className || ''}\`}
+      {...props}
     >
       {children}
     </button>
   );
 }
`;

  const customThemeDiff = `diff --git a/src/styles.css b/src/styles.css
index 456def..789abc 100644
--- a/src/styles.css
+++ b/src/styles.css
@@ -1,10 +1,15 @@
 :root {
   --primary-color: #3b82f6;
   --secondary-color: #64748b;
+  --success-color: #10b981;
+  --warning-color: #f59e0b;
+  --error-color: #ef4444;
 }
 
 .btn {
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   font-weight: 500;
+  transition: all 0.2s ease-in-out;
+  cursor: pointer;
 }
`;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Render Diff React</h1>
          <p className="subtitle">
            A beautiful and customizable React component for rendering Git diffs
            with syntax highlighting
          </p>
          <div className="badges">
            <img
              src="https://img.shields.io/npm/v/render-diff-react.svg"
              alt="npm version"
            />
            <img
              src="https://img.shields.io/npm/l/render-diff-react.svg"
              alt="license"
            />
            <img
              src="https://img.shields.io/npm/dm/render-diff-react.svg"
              alt="downloads"
            />
            <img
              src="https://img.shields.io/bundlephobia/min/render-diff-react.svg"
              alt="bundle size"
            />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="tabs">
            <button
              className={activeTab === "basic" ? "active" : ""}
              onClick={() => setActiveTab("basic")}
            >
              Basic Usage
            </button>
            <button
              className={activeTab === "languages" ? "active" : ""}
              onClick={() => setActiveTab("languages")}
            >
              Multiple Languages
            </button>
            <button
              className={activeTab === "customization" ? "active" : ""}
              onClick={() => setActiveTab("customization")}
            >
              Customization
            </button>
            <button
              className={activeTab === "theming" ? "active" : ""}
              onClick={() => setActiveTab("theming")}
            >
              Theming
            </button>
          </div>

          <div className="content">
            {activeTab === "basic" && (
              <div className="example">
                <h2>Basic Usage</h2>
                <p>Simple diff rendering with default settings:</p>
                <div className="code-example">
                  <pre>
                    <code>{`import { DiffViewer } from 'render-diff-react';

function App() {
  const diff = \`${basicDiff}\`;
  
  return <DiffViewer patch={diff} />;
}`}</code>
                  </pre>
                </div>
                <div className="diff-output">
                  <DiffViewer patch={basicDiff} />
                </div>
              </div>
            )}

            {activeTab === "languages" && (
              <div className="example">
                <h2>Multiple Languages</h2>
                <p>Syntax highlighting for different programming languages:</p>
                <div className="language-tabs">
                  <button onClick={() => setActiveTab("python")}>Python</button>
                  <button onClick={() => setActiveTab("typescript")}>
                    TypeScript
                  </button>
                </div>
                <div className="diff-output">
                  <DiffViewer
                    patch={pythonDiff}
                    syntaxHighlightLanguage="python"
                  />
                </div>
              </div>
            )}

            {activeTab === "customization" && (
              <div className="example">
                <h2>Customization Options</h2>
                <p>Hide line numbers, file headers, and customize display:</p>
                <div className="code-example">
                  <pre>
                    <code>{`<DiffViewer
  patch={diff}
  showLineNumbers={false}
  showFileHeader={false}
  showHunkHeaders={false}
  enableSyntaxHighlighting={false}
/>`}</code>
                  </pre>
                </div>
                <div className="diff-output">
                  <DiffViewer
                    patch={complexDiff}
                    showLineNumbers={false}
                    showFileHeader={false}
                    showHunkHeaders={false}
                    enableSyntaxHighlighting={false}
                  />
                </div>
              </div>
            )}

            {activeTab === "theming" && (
              <div className="example">
                <h2>Custom Theming</h2>
                <p>Customize colors and styling with the theme prop:</p>
                <div className="code-example">
                  <pre>
                    <code>{`<DiffViewer
  patch={diff}
  theme={{
    backgroundColor: "#1a1a1a",
    borderColor: "#404040",
    fileNameColor: "#ffffff",
    additionsColor: "#4ade80",
    deletionsColor: "#f87171",
    codeColor: "#e5e7eb"
  }}
/>`}</code>
                  </pre>
                </div>
                <div className="diff-output">
                  <DiffViewer
                    patch={customThemeDiff}
                    theme={{
                      backgroundColor: "#1a1a1a",
                      borderColor: "#404040",
                      fileNameColor: "#ffffff",
                      additionsColor: "#4ade80",
                      deletionsColor: "#f87171",
                      codeColor: "#e5e7eb",
                      splitViewBackgroundColor: "#0f0f0f",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="features">
            <h2>Features</h2>
            <div className="feature-grid">
              <div className="feature">
                <h3>🎨 Beautiful UI</h3>
                <p>GitHub-style diff rendering with clean, modern design</p>
              </div>
              <div className="feature">
                <h3>🔧 Highly Customizable</h3>
                <p>20+ styling props and complete theme system</p>
              </div>
              <div className="feature">
                <h3>📝 Syntax Highlighting</h3>
                <p>Built-in syntax highlighting for all languages</p>
              </div>
              <div className="feature">
                <h3>📱 Responsive</h3>
                <p>Works great on desktop and mobile devices</p>
              </div>
              <div className="feature">
                <h3>🎯 TypeScript</h3>
                <p>Full TypeScript support with comprehensive types</p>
              </div>
              <div className="feature">
                <h3>⚡ Ultra Lightweight</h3>
                <p>Zero external dependencies for core functionality</p>
              </div>
            </div>
          </div>

          <div className="installation">
            <h2>Installation</h2>
            <div className="install-commands">
              <div className="command">
                <h4>npm</h4>
                <code>npm install render-diff-react</code>
              </div>
              <div className="command">
                <h4>yarn</h4>
                <code>yarn add render-diff-react</code>
              </div>
              <div className="command">
                <h4>pnpm</h4>
                <code>pnpm add render-diff-react</code>
              </div>
            </div>
          </div>

          <div className="footer">
            <p>
              Made with ❤️ by{" "}
              <a
                href="https://github.com/AashishSinghal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aashish Singhal
              </a>
            </p>
            <p>
              <a
                href="https://github.com/AashishSinghal/render-diff-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
