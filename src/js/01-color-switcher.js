function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  
  const  start = document.querySelector('button[data-start]');
    const stop= document.querySelector('button[data-stop]');
  
  
  start.addEventListener('click', onClickBgChange);
  let button = true;
  let interval = null;
  
  function onClickBgChange() {
    const changeBgColor = () =>
      (document.querySelector('body').style.backgroundColor = getRandomHexColor());
  
    interval = setInterval(changeBgColor, 1000);
    if (button) {
      start.setAttribute('disabled', 'disabled');
     button = false;
    }
  }
  
 
  stop.addEventListener('click', onClickStopBgChange);
  
  function onClickStopBgChange() {
    //
    clearInterval(interval);
  
    if (!button) {
      start.removeAttribute('disabled');
      button = true;
    }
}

