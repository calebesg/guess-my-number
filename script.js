'use strict';

const Display = {
  number: document.querySelector('.number'),
  message: document.querySelector('.message'),
  score: document.querySelector('.score'),
  highscore: document.querySelector('.highscore'),
  guess: document.querySelector('.guess'),

  getValues: function () {
    return {
      number: this.number,
      message: this.message,
      score: this.score,
      highscore: this.highscore,
      guess: this.guess,
    };
  },

  reset: function (secretNumber) {
    let { number, message, score, highscore, guess } = this.getValues();

    number.textContent = secretNumber;
    message.textContent = 'Start guessing..';
    score.textContent = 20;
    highscore.textContent = 0;
    guess.value = '';
  },

  updateDisplay: function (field, value) {
    const fields = this.getValues();

    fields[field].textContent = value;
  },
};

const State = {
  secretNumber: 0,
  score: 20,
  highscore: 0,

  degreeScore: function () {
    if (this.score === 0) {
      return Display.updateDisplay('message', 'You Lose');
    }
    this.score--;
    Display.updateDisplay('score', this.score);
  },

  check: function (value) {
    if (value > this.secretNumber) {
      Display.updateDisplay('message', 'To Higher');
      this.degreeScore();
    } else if (value < this.secretNumber) {
      Display.updateDisplay('message', 'To Low');
      this.degreeScore();
    } else {
      Display.updateDisplay('message', 'You win');
    }
  },
};

const Game = {
  init: function () {
    State.secretNumber = Math.trunc(Math.random() * 20 + 1);
    Display.reset(State.secretNumber);
  },

  again: function () {
    this.init();
  },
};

Game.init();

document.querySelector('.check').addEventListener('click', () => {
  const current = Number(Display.guess.value);

  if (!current) {
    return Display.updateDisplay('message', 'Not a Number');
  }

  State.check(current);
});

document.querySelector('.again').addEventListener('click', () => {
  Game.again();
});
