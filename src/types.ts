// Custom Change type to replace the diff package dependency
export interface Change {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export interface FlatToken {
  text: string;
  className: string;
}

// Define basic types for the AST nodes
export interface TextNode {
  type: "text";
  value: string;
}

export interface ElementNode {
  type: "element";
  properties?: {
    className?: string[];
  };
  children?: (ElementNode | TextNode)[];
}

export type ASTNode = ElementNode | TextNode;

export type LineType = "add" | "del" | "context" | "hunk";

export interface DiffLine {
  type: LineType;
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface SplitDiffLine {
  left: DiffLine | null;
  right: DiffLine | null;
  diffs?: Change[];
}

export interface ParsedFile {
  fileName: string;
  splitLines: SplitDiffLine[];
  additions: number;
  deletions: number;
}

export interface DiffViewerProps {
  /** The Git diff patch string to render */
  patch: string;
  /** Custom CSS classes for the main container */
  className?: string;
  /** Custom CSS classes for the file container */
  fileClassName?: string;
  /** Custom CSS classes for the file header */
  fileHeaderClassName?: string;
  /** Custom CSS classes for the file name */
  fileNameClassName?: string;
  /** Custom CSS classes for the additions count */
  additionsClassName?: string;
  /** Custom CSS classes for the deletions count */
  deletionsClassName?: string;
  /** Custom CSS classes for the split view container */
  splitViewClassName?: string;
  /** Custom CSS classes for the code lines */
  codeLineClassName?: string;
  /** Custom CSS classes for the line numbers */
  lineNumberClassName?: string;
  /** Custom CSS classes for the hunk header */
  hunkHeaderClassName?: string;
  /** Custom CSS classes for the hunk content */
  hunkContentClassName?: string;
  /** Custom CSS classes for added lines */
  addedLineClassName?: string;
  /** Custom CSS classes for deleted lines */
  deletedLineClassName?: string;
  /** Custom CSS classes for context lines */
  contextLineClassName?: string;
  /** Custom CSS classes for the prefix (+/-/space) */
  prefixClassName?: string;
  /** Custom CSS classes for the code content */
  codeContentClassName?: string;
  /** Custom CSS classes for highlighted additions */
  highlightAddedClassName?: string;
  /** Custom CSS classes for highlighted deletions */
  highlightDeletedClassName?: string;
  /** Custom CSS classes for syntax highlighted tokens */
  tokenClassName?: string;
  /** Custom CSS classes for text tokens */
  tokenTextClassName?: string;
  /** Whether to show line numbers (default: true) */
  showLineNumbers?: boolean;
  /** Whether to show the file header (default: true) */
  showFileHeader?: boolean;
  /** Whether to show the hunk headers (default: true) */
  showHunkHeaders?: boolean;
  /** Whether to enable syntax highlighting (default: true) */
  enableSyntaxHighlighting?: boolean;
  /** The language to use for syntax highlighting (default: "typescript") */
  syntaxHighlightLanguage?: string;
  /** Custom theme colors */
  theme?: {
    /** Background color for the main container */
    backgroundColor?: string;
    /** Border color for file containers */
    borderColor?: string;
    /** Background color for file headers */
    fileHeaderBackgroundColor?: string;
    /** Text color for file names */
    fileNameColor?: string;
    /** Text color for additions count */
    additionsColor?: string;
    /** Text color for deletions count */
    deletionsColor?: string;
    /** Background color for the split view */
    splitViewBackgroundColor?: string;
    /** Text color for line numbers */
    lineNumberColor?: string;
    /** Text color for code content */
    codeColor?: string;
    /** Background color for added lines */
    addedLineBackgroundColor?: string;
    /** Background color for deleted lines */
    deletedLineBackgroundColor?: string;
    /** Background color for hunk headers */
    hunkHeaderBackgroundColor?: string;
    /** Text color for hunk headers */
    hunkHeaderColor?: string;
    /** Background color for highlighted additions */
    highlightAddedBackgroundColor?: string;
    /** Background color for highlighted deletions */
    highlightDeletedBackgroundColor?: string;
  };
}
