import { Notify } from 'notiflix/build/notiflix-notify-aio';

const components = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

components.form.addEventListener('submit', onClick);

function onClick(event) {
  event.preventDefault();

  const amountP = parseInt(components.amount.value);
  const delayStep = Number(components.step.value);
  let fistDelay = Number(components.firstDelay.value);

  for (let i = 1; i <= amountP; i += 1) {
    createPromise(i, fistDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    fistDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}








// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
