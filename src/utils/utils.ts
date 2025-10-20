import { createHash } from 'node:crypto';

export function hash256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}
