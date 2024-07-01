// script.js

let timer;
let elapsedTime = 0;
let isRunning = false;

const displayElement = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const updateDisplay = () => {
  displayElement.textContent = formatTime(elapsedTime);
};

const startStop = () => {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
  } else {
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000);
    startStopButton.textContent = 'Stop';
  }
  isRunning = !isRunning;
};

const reset = () => {
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
  startStopButton.textContent = 'Start';
  isRunning = false;
  lapsList.innerHTML = '';
};

const addLap = () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
};

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap);

updateDisplay();
