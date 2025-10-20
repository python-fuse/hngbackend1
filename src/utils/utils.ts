import { createHash } from 'node:crypto';
import { StringFilter } from './definitions';

export function hash256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function parseNlQ(query: string) {
  let filter: Partial<StringFilter> = {};

  // Queries to Support:
  // "all single word palindromic strings" → word_count=1, is_palindrome=true
  // "strings longer than 10 characters" → min_length=11
  // "palindromic strings that contain the first vowel" → is_palindrome=true, contains_character=a (or similar heuristic)
  // "strings containing the letter z" → contains_character=z

  query = query.toLowerCase();

  if (query.includes('palindromic')) {
    filter = { ...filter, is_palindrome: true };
  }

  const minLengthMatch = query.match(/longer than (\d+) characters/);
  if (minLengthMatch) {
    const minLength = parseInt(minLengthMatch[1], 10) + 1;
    filter = { ...filter, min_length: minLength };
  }

  const maxLengthMatch = query.match(/(shorter|less) than (\d+) characters/);
  if (maxLengthMatch) {
    const maxLength = parseInt(maxLengthMatch[2], 10) - 1;
    filter = { ...filter, max_length: maxLength };
  }

  const wordCountMatch = query.match(/all (\w+) word/);
  if (wordCountMatch) {
    const wordCount = parseInt(wordCountMatch[1], 10);
    if (!isNaN(wordCount)) {
      filter = { ...filter, word_count: wordCount };
    }
  }

  const containsCharMatch = query.match(/containing the letter (\w)/);
  if (containsCharMatch) {
    filter = { ...filter, contains_character: containsCharMatch[1] };
  }

  return filter;
}
