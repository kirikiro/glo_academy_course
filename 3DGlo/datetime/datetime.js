const renderDateTime = () => {
  const now = new Date();

  const hours = now.getHours();
  let greeting = "";

  if (hours >= 5 && hours < 12) {
    greeting = "Доброе утро";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Добрый день";
  } else if (hours >= 18 && hours < 23) {
    greeting = "Добрый вечер";
  } else {
    greeting = "Доброй ночи";
  }

  document.getElementById("greeting").textContent = greeting;

  const daysRu = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const dayName = daysRu[now.getDay()];
  document.getElementById("day-name").textContent = dayName;

  const pad = (num) => (num < 10 ? "0" + num : num);

  let displayHours = hours % 12;
  displayHours = displayHours === 0 ? 12 : displayHours;
  const period = hours >= 12 ? "PM" : "AM";

  const timeString = `${pad(displayHours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${period}`;
  document.getElementById("current-time").textContent =
    `Текущее время: ${timeString}`;

  const currentYear = now.getFullYear();
  let newYear = new Date(currentYear + 1, 0, 1);

  if (now.getMonth() === 11 && now.getDate() > 25) {
  }

  const diffTime = newYear - now;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById("days-left").textContent =
    daysLeft >= 0 ? daysLeft : 0;
};
renderDateTime();

// setInterval(renderDateTime, 1000);
