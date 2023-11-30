const randomColor = function () {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  console.log(randomColor());
  
  let intervalId;
  
  const startChangingColor = function () {
  
    if (intervalId == null) {
      intervalId = setInterval(changeBgColor, 1000);
    }
  
    function changeBgColor() {
      document.body.style.backgroundColor = randomColor();
    }
  }
  
  function stopChangingColor() {
    clearInterval(intervalId);
    intervalId = null;
  }
  
  document.querySelector("#start").addEventListener('click', startChangingColor);
  
  document.querySelector("#stop").addEventListener('click', stopChangingColor);
  
  