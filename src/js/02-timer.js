import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Підключаємо бібліотекі

const textEl = document.querySelector('#datetime-picker');
const timerHtmlEl = document.querySelector('.timer');
const btnStartEl = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

// Звертаємось до необхідних елементів HTML

btnStartEl.disabled = true;
// Блокуємо кнопку

const options = {
  enableTime: true, 
  // Вибір часу
  time_24hr: true,
  // Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
  defaultDate: new Date(),
  // Встановлює початкові вибрані дати.
  minuteIncrement: 1,
  // Регулює крок для введення хвилин
  onClose(selectedDates) {
    // Функції, які запускаються щоразу, коли календар закривається
    // Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.disabled = true;
    } else {
      btnStartEl.disabled = false;
    }
  },
};
// Прописуємо умову, якщо дата, яку вибрав користувач меньше початкової, то з'являється повідомлення і кнопка блокується, іньше - кнопка разблоковується

flatpickr(textEl, options);
// Ініціалізуємо бібліотеку flatpickr
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
// Для підрахунку значень використовуємо функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах, отриманний результат округлюємо до найближчого меншого цілого.

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// перед рендерингом інтефрейсу форматує значення (додає 0, якщо в числі менше двох символів)

btnStartEl.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(textEl.value) - new Date();
    btnStartEl.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerHtmlEl.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtmlEl.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});
// Натисканням на кнопку «Start» скрипт обчислюває раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.За 10 секунд до кінця змінює колір на черовний та з'являється оголошення, після закінчення колір на чорний и все обнуляється.