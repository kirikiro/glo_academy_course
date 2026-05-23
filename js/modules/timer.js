export const timer = (targetDateString) => {
  const containers = document.querySelectorAll(".order");
  if (containers.length === 0) return;

  const stopTime = new Date(targetDateString).getTime();
  if (isNaN(stopTime)) return;

  const formatNumber = (num) => {
    const floorValue = Math.floor(num);
    return floorValue < 10 ? `0${floorValue}` : `${floorValue}`;
  };

  const runCountdown = () => {
    const now = Date.now();
    const deltaSeconds = (stopTime - now) / 1000;

    if (deltaSeconds <= 0) {
      clearInterval(ticker);
      for (const box of containers) {
        const outputs = box.querySelectorAll(".count > span");
        for (const output of outputs) {
          output.textContent = "00";
        }
      }
      return;
    }

    const days = Math.floor(deltaSeconds / 86400);
    const hours = Math.floor((deltaSeconds % 86400) / 3600);
    const minutes = Math.floor((deltaSeconds % 3600) / 60);
    const seconds = Math.floor(deltaSeconds % 60);

    const timeData = {
      daysStr: formatNumber(days),
      hoursStr: formatNumber(hours),
      minutesStr: formatNumber(minutes),
      secondsStr: formatNumber(seconds),
    };

    for (const box of containers) {
      const dayElement = box.querySelector(".count_1 > span");
      const hourElement = box.querySelector(".count_2 > span");
      const minuteElement = box.querySelector(".count_3 > span");
      const secondElement = box.querySelector(".count_4 > span");

      if (dayElement) dayElement.textContent = timeData.daysStr;
      if (hourElement) hourElement.textContent = timeData.hoursStr;
      if (minuteElement) minuteElement.textContent = timeData.minutesStr;
      if (secondElement) secondElement.textContent = timeData.secondsStr;
    }
  };

  const ticker = setInterval(runCountdown, 1000);
  runCountdown();
};
