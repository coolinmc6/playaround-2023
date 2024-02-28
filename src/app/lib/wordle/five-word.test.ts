import { getRandomWord, isWord, getUniqueWords } from '@/app/lib/wordle/five-word';
import e from 'express';

describe('five-word.js', () => {
  describe('getRandomWord', () => {
    it('should return a random word', () => {
      const word = getRandomWord();
      expect(word).toBeDefined();
      expect(word).not.toBeNull();
    });
  })

  describe('getUniqueWords', () => {
    it('should return the unique words from a string', () => {
      expect(getUniqueWords()).toHaveLength(4);
    });
  })

  describe('isWord', () => {
    it('should return true for a word', () => {
      expect(isWord('hello')).toBe(true);
    });
    it('should return false for a non-word', () => {
      expect(isWord('hello!')).toBe(false);
    });
  })

})
