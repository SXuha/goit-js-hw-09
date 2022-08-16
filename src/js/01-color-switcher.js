// Ссылки на элементы DOM
const startBtn = document.querySelector('[data-start]');
console.log(startBtn);
const stopButton = document.querySelector('[data-stop]');
console.log(stopButton);
const bodyRef = document.querySelector('body');

// Слушатели событий
startBtn.addEventListener('click', changingBodyColor);

// Функции
function changingBodyColor() {
  const bodySetColorInterval = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = 'true';

  stopButton.addEventListener('click', () => {
    clearInterval(bodySetColorInterval);
    startBtn.disabled = '';
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changingBodyColorIntervalClear() {
  clearInterval(1);
}
