'use strict';

const State = {
  secretNumber: 0,
  score: 20,
  highscore: 0,

  degreeScore: function () {
    if (this.score === 0) {
      return Display.updateField('message', 'You Lose');
    }
    this.score--;
    Display.updateField('score', this.score);
  },

  check: function (value) {
    if (value > this.secretNumber) {
      Display.updateField('message', 'To Higher');
      this.degreeScore();
    } else if (value < this.secretNumber) {
      Display.updateField('message', 'To Low');
      this.degreeScore();
    } else {
      Display.updateField('message', 'You win');
      this.win();
    }
  },

  win: function () {
    if (this.score > this.highscore) {
      this.highscore = this.score;
      Display.gameWin(this.highscore, this.secretNumber);
    }
  },
};

const Display = {
  number: document.querySelector('.number'),
  message: document.querySelector('.message'),
  score: document.querySelector('.score'),
  highscore: document.querySelector('.highscore'),
  guess: document.querySelector('.guess'),
  body: document.querySelector('body'),

  getValues: function () {
    return {
      number: this.number,
      message: this.message,
      score: this.score,
      highscore: this.highscore,
      guess: this.guess,
      body: this.body,
    };
  },

  reset: function () {
    let { number, message, score, highscore, guess, body } = this.getValues();

    number.textContent = '?';
    message.textContent = 'Start guessing..';
    score.textContent = 20;
    guess.value = '';
    guess.removeAttribute('disabled');
    body.removeAttribute('style');
  },

  updateField: function (field, value) {
    const fields = this.getValues();

    fields[field].textContent = value;
  },

  gameWin: function (newScore, secretNumber) {
    let { guess, highscore, body, number } = this.getValues();

    number.textContent = secretNumber;
    highscore.textContent = newScore;
    body.style.backgroundColor = '#60b347';
    guess.setAttribute('disabled', 'disabled');
  },
};

const Game = {
  init: function () {
    State.secretNumber = Math.trunc(Math.random() * 20 + 1);
    Display.reset(State.secretNumber);
  },

  again: function () {
    State.score = 20;
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
