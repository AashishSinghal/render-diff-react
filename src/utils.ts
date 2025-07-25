export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

import type { Change } from "./types";

// Simple word-level diff function to replace diffWordsWithSpace from the diff package
export function diffWordsWithSpace(oldStr: string, newStr: string): Change[] {
  const changes: Change[] = [];

  // Simple implementation: split by words and spaces
  const oldWords = oldStr.split(/(\s+)/);
  const newWords = newStr.split(/(\s+)/);

  let i = 0;
  let j = 0;

  while (i < oldWords.length || j < newWords.length) {
    if (
      i < oldWords.length &&
      j < newWords.length &&
      oldWords[i] === newWords[j]
    ) {
      // Words match, keep as unchanged
      changes.push({ value: oldWords[i] });
      i++;
      j++;
    } else {
      // Words don't match, mark as removed and added
      if (i < oldWords.length) {
        changes.push({ value: oldWords[i], removed: true });
        i++;
      }
      if (j < newWords.length) {
        changes.push({ value: newWords[j], added: true });
        j++;
      }
    }
  }

  return changes;
}
