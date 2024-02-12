import { getMatches, getRandomWord } from '@/app/lib/wordle/five-word';

/**
 * Creates a new wordle grid
 * @param {number} guesses max number of guesses per round
 * @param {number} length the length of the word (default: 5)
 * @param {string} answer the answer to the wordle
 */
export default class Wordle {
  constructor ({ guesses = 6, length = 5, answer }) {
    this.gameHistory = [];
    this.newGame(guesses, length, answer);
  }

  /**
   * This function creates a new game by:
   *  - resetting the grid
   *  - resetting the hints
   *  - resetting the active guess, activeLetter, length, action, hash
   */
  newGame (guesses = 6, length = 5, answer = getRandomWord()) {
    this.grid = new Array(guesses)
      .fill('')
      .map(() => new Array(length).fill(''));
    this.hints = new Array(guesses)
      .fill('')
      .map(() => new Array(length).fill('tbd'));
    this.answer = answer;
    this.activeGuess = 0;
    this.activeLetter = 0;
    this.length = length;
    // this.constructor required for static method
    this.hash = this.constructor.getLetterMap(answer);
    this.action = 0;
    this.letters = {};
    this.gameOver = false;
    this.gameHistory.push({
      guesses,
      length,
      answer,
    });
  }

  /**
   * a quick way to add letters to the wordle object
   * @param {*} word the word to be added
   */
  addGuess (word) {
    word.split('').map((letter) => this.addLetter(letter));
  }

  /**
   * This function adds a letter to the appropriate cell. It makes sure that it is a
   * valid letter and will simply not add any numbers, symbols, etc. that are inputted
   * @param {string} _letter the letter to be added to the grid
   */
  addLetter (_letter) {
    if (this.activeGuess > this.grid.length - 1 || this.gameOver) return;
    // if not a letter, return
    const letter = _letter.toLowerCase();
    if (!/^[a-z]+$/.test(letter)) return;

    // if no more empty spaces, return
    const emptySpaces = this.grid[this.activeGuess].filter((l) => l === '');
    if (emptySpaces.length === 0) return;

    // add letter to the array
    this.grid[this.activeGuess].splice(this.activeLetter, 1, letter);

    // increment letter
    this.activeLetter += 1;
  }

  /**
   * This function removes the last letter from a particular row
   */
  removeLetter () {
    // Three cases:
    // #1: findIndex === 0 => do nothing
    // #2: findIndex === -1 => replace last element
    // #3: findIndex > 0 => replace element at findIndex - 1
    const findIndex = this.grid[this.activeGuess].findIndex((l) => l === '');

    // case #1
    if (findIndex === 0) return;
    if (findIndex === -1) {
      // case #2
      this.grid[this.activeGuess].splice(this.activeLetter - 1, 1, '');
    } else {
      // case #3
      this.grid[this.activeGuess].splice(findIndex - 1, 1, '');
    }
    this.activeLetter -= 1;
  }

  /**
   *
   * @returns {string} the word that is active
   */
  getActiveWord () {
    const word = this.grid[this.activeGuess].join('');
    return word.length === this.length ? word : false;
  }

  static getLetterMap (word) {
    return word.split('').reduce((hash, letter, index) => {
      if (hash[letter]) {
        hash[letter].push(index);
      } else {
        hash[letter] = [index]; /* eslint-disable-line no-param-reassign */
      }
      return hash;
    }, {});
  }

  /**
   * The letters object keeps track of letters that have been used already in the
   * keyboard.
   * @param {*} letter the letter you're looking for
   * @returns the color for a particular letter on the keyboard
   */
  getLetterClass (letter) {
    return this.letters[letter] || 'tbd';
  }

  /**
   * letterHints - gives hints for each letter. A hint can be:
   *   - green: correct letter in correct spot
   *   - yellow: correct letter, wrong spot
   *   - black: wrong letter
   * @return Array
   */
  letterHints () {
    if (this.activeGuess > this.grid.length - 1
      || this.gameOver
      || this.grid[this.activeGuess].filter((d) => d === '').length
    ) return [];
    this.action += 1;
    const { answer } = this;
    const guess = this.grid[this.activeGuess].join('');
    // if (guess.length < this.length) return;
    const letterMap = this.constructor.getLetterMap(answer);
    const hints = guess.split('').map((letter, index) => {
      // case #1: letter is correct and correct position
      if (letter === answer[index]) {
        letterMap[letter] = letterMap[letter].filter((i) => i !== index);
        this.letters[letter] = 'green';
        return 'green';
      }

      const letterMatches = answer.split('').filter((l) => l === letter);
      // case #2: letter is wrong and doesn't exist in word
      if (!letterMatches.length) {
        this.letters[letter] = 'black';
        return 'black';
      }

      // case #3: letter is correct but wrong spot (only one);
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

    // Required to make nested array re-render
    this.hints[this.activeGuess].map((hint, index) => {
      this.hints[this.activeGuess].splice(index, 1, finalHints[index]);
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

  /**
   * Answer hints will look at what the user has guessed and will return a
   * list of words that could fit
   */
  answerHints () {
    // I can write my own regex as I do this:
    // a{1}p{1}...
    const arr = new Array(5).fill('.');
    const takenIndex = [];
    this.hints.map((row, rowIndex) => row.map((hint, index) => {
      if (takenIndex.includes(index)) return undefined;
      if (hint === 'green') {
        const regex = `${this.grid[rowIndex][index]}{1}`;
        arr[index] = regex;
        takenIndex.push(index);
        return this.grid[rowIndex][index];
      }
      if (arr[index] === '') {
        arr[index] = ' ';
      }

      return ' ';
    }));

    const greenWords = getMatches(arr.join(''));

    // then black
    // weed out all words that have one of the black letters
    // [^badlc]{5}

    // then yellow
    return greenWords;
  }
}
