// Импорты
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Обект параметров
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Number(+selectedDates[0]) < Date.now()) {
      alert('Please choose a date in the future');
    } else {
      dateRef.startBtn.disabled = '';
    }
  },
};

// Получение ссылок на элементы
const dateRef = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  counterDays: document.querySelector('span[data-days]'),
  counterHours: document.querySelector('span[data-hours]'),
  counterMinutes: document.querySelector('span[data-minutes]'),
  counterSeconds: document.querySelector('span[data-seconds]'),
  timerList: document.querySelector('.timer'),
};

// Настройка элементов
dateRef.startBtn.disabled = 'true';

// Инициализация библиотеки
const calendar = flatpickr(dateRef.input, options);

// Слушатель события
dateRef.startBtn.addEventListener('click', initialTimer);

// Функции
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function initialTimer() {
  let isActive = false;

  if (isActive) {
    return;
  }

  const timerID = setInterval(() => {
    isActive = true;
    const difference = Date.parse(calendar.selectedDates) - Date.now();
    const counterObject = convertMs(difference);

    dateRef.counterDays.textContent = pad(counterObject.days);
    dateRef.counterHours.textContent = pad(counterObject.hours);
    dateRef.counterMinutes.textContent = pad(counterObject.minutes);
    dateRef.counterSeconds.textContent = pad(counterObject.seconds);

    if (+difference < 1000) {
      clearInterval(timerID);
      isActive = false;
      return;
    }
  }, 1000);
}

// Интерфейс
dateRef.timerList.insertAdjacentHTML(
  'beforebegin',
  '<p class="sales-text">Sales active only is:</p>'
);
