// Импорт
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Объект элементов
const ref = {
  form: document.querySelector('.form'),
};

//Слушатель события
ref.form.addEventListener('submit', event => {
  event.preventDefault();
  const firstDelay = +event.target.elements.delay.value;
  const delayStep = +event.target.elements.step.value;
  const amount = +event.target.elements.amount.value;
  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1, delay += delayStep) {
    createPromise(i, delay)
      .then(x => x)
      .catch(y => y);
  }
});

// Функции
function createPromise(numberOfPosition, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${numberOfPosition} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${numberOfPosition} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
}
