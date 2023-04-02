"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0EL = document.querySelector("#current--0");
const currentScore1EL = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let score, activePlayer, currentScore, playing;

const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = "0";
  score1El.textContent = "0";
  currentScore0EL.textContent = "0";
  currentScore1EL.textContent = "0";

  diceEl.classList.add("hidden");

  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = "0";

  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const rollDice = function () {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${diceNumber}.png`;

  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else switchPlayer();
};

const playerWon = function () {
  playing = false;
  diceEl.classList.add("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
};

const holdScore = function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= 50) playerWon();
  else switchPlayer();
};

init();

btnRoll.addEventListener("click", function () {
  if (playing) rollDice();
});

btnHold.addEventListener("click", function () {
  if (playing) holdScore();
});

btnNew.addEventListener("click", init);
