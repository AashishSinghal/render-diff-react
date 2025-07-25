export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

import type { Change } from "./types";

// Improved word-level diff function that handles character-level changes
export function diffWordsWithSpace(oldStr: string, newStr: string): Change[] {
  const changes: Change[] = [];

  // If strings are identical, return unchanged
  if (oldStr === newStr) {
    return [{ value: oldStr }];
  }

  // Split by words and spaces, but preserve the original structure
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
      // Words match exactly, keep as unchanged
      changes.push({ value: oldWords[i] });
      i++;
      j++;
    } else {
      // Words don't match, need to handle character-level diff
      if (i < oldWords.length && j < newWords.length) {
        // Both have words, do character-level diff
        const charDiffs = diffCharacters(oldWords[i], newWords[j]);
        changes.push(...charDiffs);
        i++;
        j++;
      } else if (i < oldWords.length) {
        // Only old has this word, mark as removed
        changes.push({ value: oldWords[i], removed: true });
        i++;
      } else if (j < newWords.length) {
        // Only new has this word, mark as added
        changes.push({ value: newWords[j], added: true });
        j++;
      }
    }
  }

  return changes;
}

// Helper function to do character-level diffing
function diffCharacters(oldStr: string, newStr: string): Change[] {
  const changes: Change[] = [];

  // Simple character-by-character comparison
  const maxLen = Math.max(oldStr.length, newStr.length);

  for (let i = 0; i < maxLen; i++) {
    const oldChar = i < oldStr.length ? oldStr[i] : "";
    const newChar = i < newStr.length ? newStr[i] : "";

    if (oldChar === newChar) {
      // Characters match
      if (
        changes.length > 0 &&
        !changes[changes.length - 1].removed &&
        !changes[changes.length - 1].added
      ) {
        // Extend the last unchanged change
        changes[changes.length - 1].value += oldChar;
      } else {
        changes.push({ value: oldChar });
      }
    } else {
      // Characters don't match
      if (oldChar) {
        changes.push({ value: oldChar, removed: true });
      }
      if (newChar) {
        changes.push({ value: newChar, added: true });
      }
    }
  }

  return changes;
}
