const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

// звертаємось до кнопок data-start та data-stop

btnStopEl.disabled = true;
// Блокуємо кнопку стоп
let timerId = null;
// Присвоюємо значенню часовому відрізку відсутність значення



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Функція випадкового коліру

btnStartEl.addEventListener('click', () => {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});
// Вішаємо слухача на подію клік, клик на кнопку старт блокує ії та розбловуємо кнопку стоп. ставимо зміну коліру боди в интрервалі 1 секунда

btnStopEl.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
});
// Вішаємо слухача на подію клік, клик на кнопку стоп блокує ії та розбловуємо кнопку старт