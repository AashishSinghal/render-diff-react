import { useMemo } from "react";
import { refractor } from "refractor";

import { cn, diffWordsWithSpace } from "./utils";
import { FileTextIcon, ChevronsUpDownIcon } from "./icons";
import type {
  ASTNode,
  Change,
  DiffLine,
  DiffViewerProps,
  FlatToken,
  ParsedFile,
  SplitDiffLine,
} from "./types";

function flattenHast(nodes: ASTNode[], classStack: string[] = []): FlatToken[] {
  return nodes.flatMap((node) => {
    if (node && "type" in node && node.type === "text") {
      const className =
        classStack.length > 0
          ? classStack[classStack.length - 1]
          : "token-text";
      return [{ text: node.value, className: `token ${className}` }];
    }
    if (
      node.type === "element" &&
      node.properties &&
      Array.isArray(node.properties.className)
    ) {
      const newStack = [
        ...classStack,
        ...node.properties.className.map(String),
      ];
      return flattenHast(node.children as ASTNode[], newStack);
    }
    return [];
  });
}

const parseDiff = (patch: string): ParsedFile[] => {
  if (!patch) return [];

  const fileDiffs = patch.split("diff --git ");
  const parsedFiles: ParsedFile[] = [];

  for (const fileDiff of fileDiffs) {
    if (!fileDiff.trim()) continue;

    const lines = fileDiff.split("\n");
    const fileNameMatch = lines[0].match(/b\/(.*)/);
    const fileName = fileNameMatch ? fileNameMatch[1].trim() : "Unknown File";

    let oldLineCounter = 0,
      newLineCounter = 0,
      additions = 0,
      deletions = 0;
    const diffLines: DiffLine[] = [];
    let inHunk = false;

    for (const line of lines) {
      if (line.startsWith("@@")) {
        inHunk = true;
        const hunkMatch = line.match(/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
        if (hunkMatch) {
          oldLineCounter = Number.parseInt(hunkMatch[1], 10);
          newLineCounter = Number.parseInt(hunkMatch[2], 10);
        }
        diffLines.push({ type: "hunk", content: line });
        continue;
      }
      if (!inHunk) continue;

      if (line.startsWith("+")) {
        additions++;
        diffLines.push({
          type: "add",
          content: line.substring(1),
          newLineNumber: newLineCounter++,
        });
      } else if (line.startsWith("-")) {
        deletions++;
        diffLines.push({
          type: "del",
          content: line.substring(1),
          oldLineNumber: oldLineCounter++,
        });
      } else {
        const content = line.length > 0 ? line.substring(1) : "";
        diffLines.push({
          type: "context",
          content,
          oldLineNumber: oldLineCounter++,
          newLineNumber: newLineCounter++,
        });
      }
    }

    if (diffLines.length > 0) {
      parsedFiles.push({
        fileName,
        splitLines: generateSplitLines(diffLines),
        additions,
        deletions,
      });
    }
  }
  return parsedFiles;
};

const generateSplitLines = (lines: DiffLine[]): SplitDiffLine[] => {
  const splitLines: SplitDiffLine[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.type === "context" || line.type === "hunk") {
      splitLines.push({ left: line, right: line });
      i++;
    } else if (line.type === "del") {
      let j = i;
      while (j + 1 < lines.length && lines[j + 1].type === "del") j++;
      let k = j + 1;
      while (k < lines.length && lines[k].type === "add") k++;
      const delBlock = lines.slice(i, j + 1);
      const addBlock = lines.slice(j + 1, k);
      const maxLength = Math.max(delBlock.length, addBlock.length);
      for (let l = 0; l < maxLength; l++) {
        const left = delBlock[l] || null;
        const right = addBlock[l] || null;
        const diffs =
          left && right
            ? diffWordsWithSpace(left.content, right.content)
            : undefined;
        splitLines.push({ left, right, diffs });
      }
      i = k;
    } else if (line.type === "add") {
      splitLines.push({ left: null, right: line });
      i++;
    }
  }
  return splitLines;
};

export function DiffViewer({
  patch,
  className,
  fileClassName,
  fileHeaderClassName,
  fileNameClassName,
  additionsClassName,
  deletionsClassName,
  splitViewClassName,
  codeLineClassName,
  lineNumberClassName,
  hunkHeaderClassName,
  hunkContentClassName,
  addedLineClassName,
  deletedLineClassName,
  contextLineClassName,
  prefixClassName,
  codeContentClassName,
  highlightAddedClassName,
  highlightDeletedClassName,
  tokenClassName,
  tokenTextClassName,
  showLineNumbers = true,
  showFileHeader = true,
  showHunkHeaders = true,
  enableSyntaxHighlighting = true,
  syntaxHighlightLanguage = "typescript",
  theme,
}: DiffViewerProps) {
  const files = useMemo(() => parseDiff(patch), [patch]);

  if (files.length === 0) {
    return (
      <div className="text-center text-gray-400">No changes to display.</div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {files.map((file, index) => (
        <FileDiff
          key={index}
          file={file}
          fileClassName={fileClassName}
          fileHeaderClassName={fileHeaderClassName}
          fileNameClassName={fileNameClassName}
          additionsClassName={additionsClassName}
          deletionsClassName={deletionsClassName}
          splitViewClassName={splitViewClassName}
          codeLineClassName={codeLineClassName}
          lineNumberClassName={lineNumberClassName}
          hunkHeaderClassName={hunkHeaderClassName}
          hunkContentClassName={hunkContentClassName}
          addedLineClassName={addedLineClassName}
          deletedLineClassName={deletedLineClassName}
          contextLineClassName={contextLineClassName}
          prefixClassName={prefixClassName}
          codeContentClassName={codeContentClassName}
          highlightAddedClassName={highlightAddedClassName}
          highlightDeletedClassName={highlightDeletedClassName}
          tokenClassName={tokenClassName}
          tokenTextClassName={tokenTextClassName}
          showLineNumbers={showLineNumbers}
          showFileHeader={showFileHeader}
          showHunkHeaders={showHunkHeaders}
          enableSyntaxHighlighting={enableSyntaxHighlighting}
          syntaxHighlightLanguage={syntaxHighlightLanguage}
          theme={theme}
        />
      ))}
    </div>
  );
}

interface FileDiffProps extends Omit<DiffViewerProps, "patch"> {
  file: ParsedFile;
}

const FileDiff = ({
  file,
  fileClassName,
  fileHeaderClassName,
  fileNameClassName,
  additionsClassName,
  deletionsClassName,
  splitViewClassName,
  codeLineClassName,
  lineNumberClassName,
  hunkHeaderClassName,
  hunkContentClassName,
  addedLineClassName,
  deletedLineClassName,
  contextLineClassName,
  prefixClassName,
  codeContentClassName,
  highlightAddedClassName,
  highlightDeletedClassName,
  tokenClassName,
  tokenTextClassName,
  showLineNumbers = true,
  showFileHeader = true,
  showHunkHeaders = true,
  enableSyntaxHighlighting = true,
  syntaxHighlightLanguage = "typescript",
  theme,
}: FileDiffProps) => {
  const defaultBorderColor = theme?.borderColor || "#30363d";
  const defaultFileHeaderBg = theme?.fileHeaderBackgroundColor || "#161b22";
  const defaultFileNameColor = theme?.fileNameColor || "#c9d1d9";
  const defaultAdditionsColor = theme?.additionsColor || "#3fb950";
  const defaultDeletionsColor = theme?.deletionsColor || "#f85149";

  return (
    <div
      className={cn("border rounded-md overflow-hidden", fileClassName)}
      style={{
        borderColor: defaultBorderColor,
      }}
    >
      {showFileHeader && (
        <div
          className={cn(
            "flex items-center gap-3 bg-[#161b22] px-4 py-2 border-b border-[#30363d]",
            fileHeaderClassName
          )}
          style={{
            backgroundColor: defaultFileHeaderBg,
            borderColor: defaultBorderColor,
          }}
        >
          <FileTextIcon className="h-5 w-5 text-[#8b949e]" />
          <span
            className={cn("font-mono text-sm", fileNameClassName)}
            style={{ color: defaultFileNameColor }}
          >
            {file.fileName}
          </span>
          <span
            className={cn("font-semibold text-xs", additionsClassName)}
            style={{ color: defaultAdditionsColor }}
          >
            +{file.additions}
          </span>
          <span
            className={cn("font-semibold text-xs", deletionsClassName)}
            style={{ color: defaultDeletionsColor }}
          >
            -{file.deletions}
          </span>
        </div>
      )}
      <SplitView
        file={file}
        splitViewClassName={splitViewClassName}
        codeLineClassName={codeLineClassName}
        lineNumberClassName={lineNumberClassName}
        hunkHeaderClassName={hunkHeaderClassName}
        hunkContentClassName={hunkContentClassName}
        addedLineClassName={addedLineClassName}
        deletedLineClassName={deletedLineClassName}
        contextLineClassName={contextLineClassName}
        prefixClassName={prefixClassName}
        codeContentClassName={codeContentClassName}
        highlightAddedClassName={highlightAddedClassName}
        highlightDeletedClassName={highlightDeletedClassName}
        tokenClassName={tokenClassName}
        tokenTextClassName={tokenTextClassName}
        showLineNumbers={showLineNumbers}
        showHunkHeaders={showHunkHeaders}
        enableSyntaxHighlighting={enableSyntaxHighlighting}
        syntaxHighlightLanguage={syntaxHighlightLanguage}
        theme={theme}
      />
    </div>
  );
};

interface SplitViewProps extends Omit<FileDiffProps, "file"> {
  file: ParsedFile;
}

const SplitView = ({
  file,
  splitViewClassName,
  codeLineClassName,
  lineNumberClassName,
  hunkHeaderClassName,
  hunkContentClassName,
  addedLineClassName,
  deletedLineClassName,
  contextLineClassName,
  prefixClassName,
  codeContentClassName,
  highlightAddedClassName,
  highlightDeletedClassName,
  tokenClassName,
  tokenTextClassName,
  showLineNumbers = true,
  showHunkHeaders = true,
  enableSyntaxHighlighting = true,
  syntaxHighlightLanguage = "typescript",
  theme,
}: SplitViewProps) => {
  const defaultSplitViewBg = theme?.splitViewBackgroundColor || "#0d1117";
  const defaultLineNumberColor = theme?.lineNumberColor || "#8b949e";
  const defaultAddedLineBg =
    theme?.addedLineBackgroundColor || "rgba(46,160,67,0.15)";
  const defaultDeletedLineBg =
    theme?.deletedLineBackgroundColor || "rgba(248,81,73,0.15)";
  const defaultHunkHeaderBg = theme?.hunkHeaderBackgroundColor || "#161b22";
  const defaultHunkHeaderColor = theme?.hunkHeaderColor || "#8b949e";

  return (
    <div
      className={cn(
        "font-mono text-xs md:text-sm overflow-hidden",
        splitViewClassName
      )}
      style={{ backgroundColor: defaultSplitViewBg }}
    >
      <div className="w-full">
        {file.splitLines.map((splitLine, lineIndex) => {
          const { left, right } = splitLine;
          if (
            (left?.type === "hunk" || right?.type === "hunk") &&
            showHunkHeaders
          ) {
            return (
              <div
                key={lineIndex}
                className="flex"
                style={{ backgroundColor: defaultHunkHeaderBg }}
              >
                <div
                  className={cn(
                    "px-2 py-1 select-none w-10 flex-shrink-0",
                    hunkHeaderClassName
                  )}
                  style={{ color: defaultLineNumberColor }}
                >
                  <ChevronsUpDownIcon className="w-4 h-4 inline-block" />
                </div>
                <div
                  className={cn(
                    "px-4 py-1 flex-1 overflow-x-auto",
                    hunkContentClassName
                  )}
                  style={{
                    color: defaultHunkHeaderColor,
                    backgroundColor: "rgba(56,139,253,0.15)",
                  }}
                >
                  <code className="whitespace-pre-wrap break-all">
                    {left?.content}
                  </code>
                </div>
              </div>
            );
          }

          const leftBg = left?.type === "del" ? defaultDeletedLineBg : "";
          const rightBg = right?.type === "add" ? defaultAddedLineBg : "";

          return (
            <div key={lineIndex} className="flex">
              {showLineNumbers && (
                <div
                  className={cn(
                    "px-2 py-0.5 text-right select-none w-10 flex-shrink-0 whitespace-nowrap",
                    lineNumberClassName,
                    left?.type === "del" && deletedLineClassName
                  )}
                  style={{
                    color: defaultLineNumberColor,
                    backgroundColor: leftBg,
                  }}
                >
                  {left?.oldLineNumber}
                </div>
              )}
              <div
                className={cn(
                  "px-4 py-0.5 flex-1 min-w-0",
                  codeLineClassName,
                  left?.type === "del" && deletedLineClassName,
                  left?.type === "add" && addedLineClassName,
                  left?.type === "context" && contextLineClassName
                )}
                style={{ backgroundColor: leftBg }}
              >
                <CodeLine
                  line={left}
                  diffs={splitLine.diffs}
                  type="del"
                  prefixClassName={prefixClassName}
                  codeContentClassName={codeContentClassName}
                  highlightAddedClassName={highlightAddedClassName}
                  highlightDeletedClassName={highlightDeletedClassName}
                  tokenClassName={tokenClassName}
                  tokenTextClassName={tokenTextClassName}
                  enableSyntaxHighlighting={enableSyntaxHighlighting}
                  syntaxHighlightLanguage={syntaxHighlightLanguage}
                  theme={theme}
                />
              </div>
              {showLineNumbers && (
                <div
                  className={cn(
                    "px-2 py-0.5 text-right select-none w-10 flex-shrink-0 whitespace-nowrap",
                    lineNumberClassName,
                    right?.type === "add" && addedLineClassName
                  )}
                  style={{
                    color: defaultLineNumberColor,
                    backgroundColor: rightBg,
                  }}
                >
                  {right?.newLineNumber}
                </div>
              )}
              <div
                className={cn(
                  "px-4 py-0.5 flex-1 min-w-0",
                  codeLineClassName,
                  right?.type === "add" && addedLineClassName,
                  right?.type === "del" && deletedLineClassName,
                  right?.type === "context" && contextLineClassName
                )}
                style={{ backgroundColor: rightBg }}
              >
                <CodeLine
                  line={right}
                  diffs={splitLine.diffs}
                  type="add"
                  prefixClassName={prefixClassName}
                  codeContentClassName={codeContentClassName}
                  highlightAddedClassName={highlightAddedClassName}
                  highlightDeletedClassName={highlightDeletedClassName}
                  tokenClassName={tokenClassName}
                  tokenTextClassName={tokenTextClassName}
                  enableSyntaxHighlighting={enableSyntaxHighlighting}
                  syntaxHighlightLanguage={syntaxHighlightLanguage}
                  theme={theme}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface CodeLineProps {
  line: DiffLine | null;
  diffs?: Change[];
  type: "add" | "del";
  prefixClassName?: string;
  codeContentClassName?: string;
  highlightAddedClassName?: string;
  highlightDeletedClassName?: string;
  tokenClassName?: string;
  tokenTextClassName?: string;
  enableSyntaxHighlighting?: boolean;
  syntaxHighlightLanguage?: string;
  theme?: DiffViewerProps["theme"];
}

const CodeLine = ({
  line,
  diffs,
  type,
  prefixClassName,
  codeContentClassName,
  highlightAddedClassName,
  highlightDeletedClassName,
  tokenClassName,
  tokenTextClassName,
  enableSyntaxHighlighting = true,
  syntaxHighlightLanguage = "typescript",
  theme,
}: CodeLineProps) => {
  const tokens = useMemo(() => {
    if (!line || !enableSyntaxHighlighting) return [];
    try {
      const tree = refractor.highlight(
        line.content,
        syntaxHighlightLanguage as any
      );
      return flattenHast((tree as any).children as ASTNode[]);
    } catch (e) {
      return [
        { text: line.content, className: tokenTextClassName || "token-text" },
      ];
    }
  }, [
    line,
    enableSyntaxHighlighting,
    syntaxHighlightLanguage,
    tokenTextClassName,
  ]);

  const defaultCodeColor = theme?.codeColor || "#c9d1d9";
  const defaultHighlightAddedBg =
    theme?.highlightAddedBackgroundColor || "rgba(46,160,67,0.4)";
  const defaultHighlightDeletedBg =
    theme?.highlightDeletedBackgroundColor || "rgba(248,81,73,0.4)";

  if (!line)
    return (
      <div className="flex h-[20px]">
        <span className="w-4 select-none"> </span>
      </div>
    );

  const prefix = line.type === "add" ? "+" : line.type === "del" ? "-" : " ";

  if (diffs) {
    let tokenIndex = 0;
    let charIndexInToken = 0;

    return (
      <div className="flex min-w-0">
        <span
          className={cn("w-4 select-none flex-shrink-0", prefixClassName)}
          style={{ color: defaultCodeColor }}
        >
          {prefix}
        </span>
        <code
          className={cn(
            "whitespace-pre-wrap break-all min-w-0 flex-1",
            codeContentClassName
          )}
          style={{ color: defaultCodeColor }}
        >
          {diffs.map((part, index) => {
            if (
              (type === "del" && part.added) ||
              (type === "add" && part.removed)
            ) {
              return null;
            }

            const highlightClass = part.removed
              ? highlightDeletedClassName || "bg-[rgba(248,81,73,0.4)]"
              : part.added
              ? highlightAddedClassName || "bg-[rgba(46,160,67,0.4)]"
              : "";

            const partContent = [];
            let remainingTextInPart = part.value;
            while (
              remainingTextInPart.length > 0 &&
              tokenIndex < tokens.length
            ) {
              const currentToken = tokens[tokenIndex];
              const tokenText = currentToken.text.substring(charIndexInToken);
              const textToRender =
                tokenText.length > remainingTextInPart.length
                  ? remainingTextInPart
                  : tokenText;

              partContent.push(
                <span
                  key={partContent.length}
                  className={cn(currentToken.className, tokenClassName)}
                >
                  {textToRender}
                </span>
              );

              remainingTextInPart = remainingTextInPart.substring(
                textToRender.length
              );
              charIndexInToken += textToRender.length;
              if (charIndexInToken >= currentToken.text.length) {
                tokenIndex++;
                charIndexInToken = 0;
              }
            }

            return (
              <span key={index} className={highlightClass}>
                {partContent}
              </span>
            );
          })}
        </code>
      </div>
    );
  }

  return (
    <div className="flex min-w-0">
      <span
        className={cn("w-4 select-none flex-shrink-0", prefixClassName)}
        style={{ color: defaultCodeColor }}
      >
        {prefix}
      </span>
      <code
        className={cn(
          "whitespace-pre-wrap break-all min-w-0 flex-1",
          codeContentClassName
        )}
        style={{ color: defaultCodeColor }}
      >
        {tokens.map((token, i) => (
          <span key={i} className={cn(token.className, tokenClassName)}>
            {token.text}
          </span>
        ))}
      </code>
    </div>
  );
};
