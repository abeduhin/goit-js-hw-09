import Notiflix from 'notiflix';
// Підключаємо бібліотеку

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

// Звертаємось до необхідних елементів HTML

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
// Пишемо функцію де параметрами є номер промісу (position) та затримку, враховуючи першу затримку (delay), введену користувачем. Ця функция повертає виконаний promise (resolve) або повертає відхилений promise (reject).


btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
// Вішаємо слухача на подію клік, подія викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount та повертає Promise (then), якщо відхилений, то працює метод catch
