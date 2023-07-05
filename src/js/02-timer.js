import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
// import 'notiflix/dist/notiflix-3.2.6.min.css';

const dateTime = document.querySelector('#datetime-picker');
const dateStart = document.querySelector('button[data-start]');


dateTime.setAttribute('placeholder', 'Choose required date');

dateStart.setAttribute('disabled', 'disabled');

const createBtn = document.createElement('button');
const resetButton = dateStart.insertAdjacentElement('afterend', createBtn);

resetButton.textContent = 'Reset';
resetButton.setAttribute('type', 'button');
resetButton.setAttribute('data-reset', '');
resetButton.classList.add('is-hidden');

const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();

    if (selectedDates[0].getTime() < currentTime) {
      Report.warning('Oops!', 'Please choose future date!', 'Try Again');
    } else {
      dateStart.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const reversTimer= {
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};

//Convert ms to Date
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

dateStart.addEventListener('click', onClickStartReversTimer);

let intervalId = null;

function onClickStartReversTimer() {
  intervalId = setInterval(updateCounter, 1000);

  function updateCounter() {
    let inputDate = new Date(dateTime.value);
    const currentDate = Date.now();
    const deltaTime = inputDate.getTime() - currentDate;
    const deltaTimeObj = convertMs(deltaTime);

    if (isNaN(inputDate)) {
      Report.warning('Oops!', 'Please choose future date!', 'Try Again');
      clearInterval(intervalId);

      return;
    }
    if (deltaTime < 0) {
      clearInterval(intervalId);
      resetButton.classList.add('is-hidden');
      dateStart.classList.remove('is-hidden');
      dateTime.value = '';
      return;
    }

    reversTimer.dataDays.textContent = addLeadingZero(
      deltaTimeObj.days
    );
    reversTimer.dataHours.textContent = addLeadingZero(
      deltaTimeObj.hours
    );
    reversTimer.dataMinutes.textContent = addLeadingZero(
      deltaTimeObj.minutes
    );
    reversTimer.dataSeconds.textContent = addLeadingZero(
      deltaTimeObj.seconds
    );

    dateStart.classList.add('is-hidden');
    resetButton.classList.remove('is-hidden');
  }
}

resetButton.addEventListener('click', onClickClearInterval);

function onClickClearInterval() {
  
  clearInterval(intervalId);

  reversTimer.dataDays.textContent = '00';
  reversTimer.dataHours.textContent = '00';
  reversTimer.dataMinutes.textContent = '00';
  reversTimer.dataSeconds.textContent = '00';

  dateTime.value = '';

  resetButton.classList.add('is-hidden');
  dateStart.classList.remove('is-hidden');
}
