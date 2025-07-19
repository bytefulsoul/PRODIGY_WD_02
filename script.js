let startTime, interval;
let running = false;
const timeDisplay = document.getElementById('time');
const laps = document.getElementById('laps');

function startStop() {
  if (!running) {
    startTime = Date.now() - (parseInt(timeDisplay.dataset.time) || 0);
    interval = setInterval(updateTime, 100);
    running = true;
  } else {
    clearInterval(interval);
    running = false;
  }
}

function updateTime() {
  const elapsed = Date.now() - startTime;
  timeDisplay.dataset.time = elapsed;
  const date = new Date(elapsed);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const ms = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  timeDisplay.textContent = `${min}:${sec}:${ms}`;
}

function reset() {
  clearInterval(interval);
  running = false;
  timeDisplay.textContent = '00:00:00';
  timeDisplay.dataset.time = 0;
  laps.innerHTML = '';
}

function lap() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = timeDisplay.textContent;
    laps.appendChild(li);
  }
}

document.getElementById('themes').addEventListener('change', (e) => {
  document.body.className = e.target.value;
});