"use strict";

const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const dayNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

function declension(num, forms) {
  const n = Math.abs(num) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

function pad(num) {
  return String(num).padStart(2, "0");
}

function formatA(date) {
  const day = dayNames[date.getDay()];
  const dayNumber = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const hourWord = declension(hours, ["час", "часа", "часов"]);
  const minuteWord = declension(minutes, ["минута", "минуты", "минут"]);
  const secondWord = declension(seconds, ["секунда", "секунды", "секунд"]);

  return `Сегодня ${day}, ${dayNumber} ${month} ${year} года, ${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;
};

function formatB(date) {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
}

function updateDateTime() {
  const now = new Date();

  const elemA = document.getElementById("formatA");
  const elemB = document.getElementById("formatB");

  if (elemA) elemA.textContent = formatA(now);
  if (elemB) elemB.textContent = formatB(now);
}

updateDateTime();

setInterval(updateDateTime, 1000);