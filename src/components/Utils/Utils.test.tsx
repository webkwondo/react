import { describe, it } from 'vitest';
import { cropPhrase, formatPhrase, formatDate } from './Utils';

describe('cropPhrase function', () => {
  it('should return an empty string when input is empty', () => {
    expect(cropPhrase('')).toEqual('');
  });

  it('should return the input string when there are less than 16 words', () => {
    expect(cropPhrase('this is a test')).toEqual('this is a test');
  });

  it('should return the first 16 words when there are more than 16 words', () => {
    const longPhrase =
      'this is a very very very long phrase with more than 16 words that needs to be cropped';
    expect(cropPhrase(longPhrase)).toEqual(
      'this is a very very very long phrase with more than 16 words that needs to'
    );
  });
});

describe('formatPhrase', () => {
  it('should return an empty string when given an empty string', () => {
    const result = formatPhrase('');
    expect(result).toBe('');
  });

  it('should capitalize the first letter of a given string', () => {
    const result = formatPhrase('hello world');
    expect(result).toBe('Hello world');
  });
});

describe('formatDate', () => {
  it('should format a given date string correctly', () => {
    const dateStr = '2022-03-17T12:00:00.000Z';
    const result = formatDate(dateStr);
    expect(result).toBe('March 17, 2022 at 12:00:00');
  });
});
