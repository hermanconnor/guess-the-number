'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const maxNumberInput = document.getElementById('max-number');
  const setMaxButton = document.getElementById('set-max');
  const currentMaxSpan = document.getElementById('current-max');
  const gameMessage = document.getElementById('game-message');
  const guessInput = document.getElementById('guess');
  const submitGuessButton = document.getElementById('submit-guess');
  const guessesList = document.getElementById('guesses-list');
  const attemptsSpan = document.getElementById('attempts');
  const newGameButton = document.getElementById('new-game');

  let maxNumber = 10;
  let attempts = 0;
  let gameOver = false;

  let targetNumber;

  function initGame() {
    maxNumber = parseInt(maxNumberInput.value) || 10;
    targetNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    gameOver = false;

    currentMaxSpan.textContent = maxNumber;
    gameMessage.textContent = `I'm thinking of a number between 1 and ${maxNumber}. Can you guess it?`;
    attemptsSpan.textContent = attempts;
    guessesList.innerHTML = '';
    guessInput.value = '';
    guessInput.setAttribute('max', maxNumber);
    guessInput.focus();
  }

  function handleSetMaxNumber() {
    const newMax = parseInt(maxNumberInput.value);

    if (newMax >= 2) {
      initGame();
    } else {
      maxNumberInput.value = maxNumber;
      gameMessage.textContent = 'Maximum number must be at least 2.';
    }
  }

  function handleGuess() {
    if (gameOver) return;

    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
      gameMessage.textContent = `⚠️ Please enter a valid number between 1 and ${maxNumber}.`;
      guessInput.classList.add('shake');
      setTimeout(() => guessInput.classList.remove('shake'), 500);
      return;
    }

    attempts++;
    attemptsSpan.textContent = attempts;

    const guessItem = document.createElement('li');
    guessItem.textContent = guess;

    if (guess < targetNumber) {
      guessItem.classList.add('too-low');
      gameMessage.textContent = 'Too low! Try a higher number.';
    } else if (guess > targetNumber) {
      guessItem.classList.add('too-high');
      gameMessage.textContent = 'Too high! Try a lower number.';
    } else {
      guessItem.classList.add('correct');
      gameMessage.textContent = `🎉 Congratulations! You guessed the number in ${attempts} attempts! 🎉`;
      gameOver = true;
    }

    guessesList.appendChild(guessItem);
    guessInput.value = '';
    guessInput.focus();
  }

  // EVENT LISTENERS
  setMaxButton.addEventListener('click', handleSetMaxNumber);
  submitGuessButton.addEventListener('click', handleGuess);
  guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  });
  newGameButton.addEventListener('click', initGame);

  // Initialize game when page loads
  initGame();
});
