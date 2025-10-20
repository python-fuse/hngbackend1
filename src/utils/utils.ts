import { createHash } from 'node:crypto';
import { StringFilter } from './definitions';

export function hash256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function parseNlQ(query: string) {
  let filter: Partial<StringFilter> = {};

  query = query.toLowerCase();

  // Palindrome detection - multiple patterns
  if (
    query.includes('palindromic') ||
    query.includes('palindrome') ||
    query.includes('palindromes')
  ) {
    filter = { ...filter, is_palindrome: true };
  }

  // Length patterns - improved regex
  const minLengthMatch = query.match(/(?:longer|more) than (\d+) characters?/);
  if (minLengthMatch) {
    const minLength = parseInt(minLengthMatch[1], 10) + 1;
    filter = { ...filter, min_length: minLength };
  }

  // Also handle "with more than X characters"
  const moreCharMatch = query.match(/with more than (\d+) characters?/);
  if (moreCharMatch) {
    const minLength = parseInt(moreCharMatch[1], 10) + 1;
    filter = { ...filter, min_length: minLength };
  }

  // Length patterns for shorter/less
  const maxLengthMatch = query.match(/(?:shorter|less) than (\d+) characters?/);
  if (maxLengthMatch) {
    const maxLength = parseInt(maxLengthMatch[2], 10) - 1;
    filter = { ...filter, max_length: maxLength };
  }

  // Exact length patterns
  const exactLengthMatch = query.match(/(?:exactly|with) (\d+) characters?/);
  if (exactLengthMatch) {
    const exactLength = parseInt(exactLengthMatch[1], 10);
    filter = { ...filter, min_length: exactLength, max_length: exactLength };
  }

  // Word count patterns
  const singleWordMatch = query.match(/(?:single word|one word)/);
  if (singleWordMatch) {
    filter = { ...filter, word_count: 1 };
  }

  const twoWordMatch = query.match(/(?:two word|2 word)/);
  if (twoWordMatch) {
    filter = { ...filter, word_count: 2 };
  }

  // General word count pattern
  const wordCountMatch = query.match(/(?:with|exactly) (\d+) words?/);
  if (wordCountMatch) {
    const wordCount = parseInt(wordCountMatch[1], 10);
    filter = { ...filter, word_count: wordCount };
  }

  // Number word mapping
  const numberWords = {
    one: 1,
    single: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

  for (const [word, count] of Object.entries(numberWords)) {
    if (query.includes(`${word} word`)) {
      filter = { ...filter, word_count: count };
      break;
    }
  }

  // Character containing patterns
  const containsCharMatch = query.match(/containing (?:the )?letter ([a-z])/);
  if (containsCharMatch) {
    filter = { ...filter, contains_character: containsCharMatch[1] };
  }

  // Alternative character patterns
  const hasCharMatch = query.match(
    /(?:with|have|has) (?:the )?(?:letter|character) ([a-z])/,
  );
  if (hasCharMatch) {
    filter = { ...filter, contains_character: hasCharMatch[1] };
  }

  // Vowel patterns
  const vowelMatch = query.match(
    /containing (?:the )?first vowel|with (?:the )?first vowel/,
  );
  if (vowelMatch) {
    filter = { ...filter, contains_character: 'a' };
  }

  // Common test patterns
  if (query.includes('strings with') && query.includes('characters')) {
    const withCharMatch = query.match(/strings with (\d+) characters/);
    if (withCharMatch) {
      const exactLength = parseInt(withCharMatch[1], 10);
      filter = { ...filter, min_length: exactLength, max_length: exactLength };
    }
  }

  return filter;
}
