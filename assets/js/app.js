//DOM elements

// Declare state variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerId = null; // holds setInterval id

// Get DOM elements
const topClearBtn = document.getElementById("topClearBtn"); //button in header
const display = document.getElementById("display"); // this display the timer
const startBtn = document.getElementById("startBtn"); // starts the timer
const stopBtn = document.getElementById("stopBtn"); //stops the timer
const resetBtn = document.getElementById("resetBtn"); // resets the timer
const lapBtn = document.getElementById("lapBtn"); // records lap time
const lapList = document.getElementById('lapList');
const bigToggle = document.getElementById("bigToggle"); // big start/stop button

// Format numbers to two and three it digits
function two(n) {
  return n.toString().padStart(2, "0");
}
function three(n) {
  return n.toString().padStart(3, "0");
}

// Update the visual display
function updateDisplay() {
  display.textContent = `${two(hours)}:${two(minutes)}:${two(seconds)}:${three(
    milliseconds
  )}`;
}

// Add a lap entry
function recordLap() {
  const lapTime = `${two(hours)}:${two(minutes)}:${two(seconds)}:${three(milliseconds)}`;
  lapList.innerHTML = ''; // Clear previous lap
  const li = document.createElement("li");
  li.textContent = `Lap: ${lapTime}`;
  lapList.appendChild(li);
}

// displayTimer function called every second
function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

// Start handler: prevent multiple timers by checking timerId
function start() {
  if (timerId !== null) return; // already running
  // Call tick immediately so display updates without 1s delay
  displayTimer();
  timerId = setInterval(displayTimer, 10);

  if (bigToggle) {
    bigToggle.textContent = 'Stop'; 
    bigToggle.setAttribute('aria-pressed', 'true');
  }
}

// Stop handler: pauses the timer
function stop() {
  if (timerId === null) return; // already stopped
  clearInterval(timerId);
  timerId = null;

  if (bigToggle) {
    bigToggle.textContent = 'Start'; // update button label
    bigToggle.setAttribute('aria-pressed', 'false'); // mark as inactive
  }
  recordLap(); // Record lap time when stopped
}

// Reset handler: stop and zero everything
function reset() {
  stop();
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapList.innerHTML = ''; // Clear lap list
}

//big button toggle feature
function toggleTimer() {
  if (timerId === null) {
    start(); // use existing start function
  } else {
    stop(); // use existing stop function
  }
}

// Attach events
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
topClearBtn.addEventListener('click', reset);
bigToggle.addEventListener("click", toggleTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize display
updateDisplay();

