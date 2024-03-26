import { getMatches, getRandomWord } from '@/app/lib/wordle/five-word';

interface GameHistoryEntry {
  guesses: number;
  length: number;
  answer: string;
}

interface LetterMap {
  [key: string]: number[];
}

export default class Wordle {
  private gameHistory: GameHistoryEntry[];
  private grid: string[][];
  private hints: string[][];
  private answer: string;
  private activeGuess: number;
  private activeLetter: number;
  private length: number;
  private hash: LetterMap;
  private action: number;
  private letters: { [key: string]: string };
  private gameOver: boolean;

  constructor({ guesses = 6, length = 5, answer }: { guesses?: number; length?: number; answer: string }) {
    this.gameHistory = [];
    this.newGame(guesses, length, answer);
  }

  newGame(guesses: number = 6, length: number = 5, answer: string = getRandomWord()): void {
    this.grid = new Array(guesses).fill('').map(() => new Array(length).fill(''));
    this.hints = new Array(guesses).fill('').map(() => new Array(length).fill('tbd'));
    this.answer = answer;
    this.activeGuess = 0;
    this.activeLetter = 0;
    this.length = length;
    this.hash = Wordle.getLetterMap(answer);
    this.action = 0;
    this.letters = {};
    this.gameOver = false;
    this.gameHistory.push({ guesses, length, answer });
  }

  addGuess(word: string): void {
    word.split('').forEach((letter) => this.addLetter(letter));
  }

  addLetter(_letter: string): void {
    if (this.activeGuess > this.grid.length - 1 || this.gameOver) return;
    const letter = _letter.toLowerCase();
    if (!/^[a-z]+$/.test(letter)) return;

    const emptySpaces = this.grid[this.activeGuess].filter((l) => l === '');
    if (emptySpaces.length === 0) return;

    this.grid[this.activeGuess].splice(this.activeLetter, 1, letter);
    this.activeLetter += 1;
  }

  removeLetter(): void {
    const findIndex = this.grid[this.activeGuess].findIndex((l) => l === '');
    if (findIndex === 0) return;
    if (findIndex === -1) {
      this.grid[this.activeGuess].splice(this.activeLetter - 1, 1, '');
    } else {
      this.grid[this.activeGuess].splice(findIndex - 1, 1, '');
    }
    this.activeLetter -= 1;
  }

  getActiveWord(): string | false {
    const word = this.grid[this.activeGuess].join('');
    return word.length === this.length ? word : false;
  }

  static getLetterMap(word: string): LetterMap {
    return word.split('').reduce((hash: LetterMap, letter, index) => {
      if (hash[letter]) {
        hash[letter].push(index);
      } else {
        hash[letter] = [index];
      }
      return hash;
    }, {});
  }

  getLetterClass(letter: string): string {
    return this.letters[letter] || 'tbd';
  }

  letterHints(): string[] {
    if (this.activeGuess > this.grid.length - 1 || this.gameOver || this.grid[this.activeGuess].filter((d) => d === '').length) return [];
    this.action += 1;
    const guess = this.grid[this.activeGuess].join('');
    const letterMap = Wordle.getLetterMap(this.answer);
    const hints = guess.split('').map((letter, index) => {
      if (letter === this.answer[index]) {
        letterMap[letter] = letterMap[letter].filter((i) => i !== index);
        this.letters[letter] = 'green';
        return 'green';
      }

      const letterMatches = this.answer.split('').filter((l) => l === letter);
      if (!letterMatches.length) {
        this.letters[letter] = 'black';
        return 'black';
      }

      if (letterMatches.length) {
        if (this.letters[letter] !== 'green') {
          this.letters[letter] = 'yellow';
        }
        return 'yellow';
      }
      return 'black';
    });

    const finalHints = guess.split('').map((letter, index) => {
      const hint = hints[index];
      if (hint === 'yellow') {
        if (letterMap[letter].length === 0) {
          return 'black';
        }
        letterMap[letter].shift();
        return 'yellow';
      }
      return hint;
    });

    this.hints[this.activeGuess] = this.hints[this.activeGuess].map((hint, index) => {
      this.hints[this.activeGuess][index] = finalHints[index];
      return null;
    });

    if (finalHints.every((h) => h === 'green')) {
      this.gameOver = true;
    }

    this.activeGuess += 1;
    this.activeLetter = 0;

    if (this.activeGuess === this.grid.length) {
      this.gameOver = true;
    }

    return finalHints;
  }

  answerHints(): string[] {
    const arr = new Array(5).fill('.');
    const takenIndex: number[] = [];
    this.hints.forEach((row, rowIndex) => row.forEach((hint, index) => {
      if (takenIndex.includes(index)) return;
      if (hint === 'green') {
        arr[index] = `${this.grid[rowIndex][index]}{1}`;
        takenIndex.push(index);
      }
    }));

    const greenWords = getMatches(arr.join(''));
    return greenWords;
  }
}
