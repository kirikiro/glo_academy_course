const timer = (deadline) => {
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");

  const padZero = (num) => {
    return num < 10 ? '0' + num : String(num);
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    let timeRemaining = (dateStop - dateNow) / 1000;

    if (timeRemaining <= 0) {
      return { timeRemaining: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((timeRemaining / 60 / 60) % 24);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const seconds = Math.floor(timeRemaining % 60);

    return { timeRemaining, hours, minutes, seconds };
  };

  const updateClock = () => {
    if (!timerHours || !timerMinutes || !timerSeconds) return;

    const time = getTimeRemaining();
    
    timerHours.textContent = padZero(time.hours);
    timerMinutes.textContent = padZero(time.minutes);
    timerSeconds.textContent = padZero(time.seconds);

    if (time.timeRemaining <= 0) {
      clearInterval(intervalId);
    }
    // тик для чека
    // console.log('тик:', new Date().toLocaleTimeString());
  };

  updateClock();
  
  const intervalId = setInterval(updateClock, 1000);
};

timer("8 May 2026");