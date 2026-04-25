"use strict";

const rollback = 1500;
let title;
let screens;
let screenPrice;
let adaptive;
let service1 = "";
let service2 = "";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

// вынес функцию проверки числа отдельно, чтобы удобно было и не было спагетти кода
function checkTheInput(str, def) {
  let input;
  do {
    let raw = prompt(str, def);
    if (raw === null) return null;
    raw = raw.trim();
    if (raw === "") {
      alert("Ошибка: пустая строка");
      continue;
    }
    input = Number(raw);
    if (!isNumber(input) || input <= 0) {
      alert("Ошибка, введите положительное число.");
    }
  } while (!isNumber(input) || input <= 0);
  return input;
}

// по заданию
const asking = function () {
  title = prompt("Как называется проект?", "абоба");
  screens = prompt("Какие типы экранов нужно разработать?", "хорошие, плохие");
  screenPrice = checkTheInput("Сколько будет стоить данная работа?", "120000");
  adaptive = confirm("Нужен ли адаптив на сайте?");
  title = getTitle(title);
};

// по заданию
const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    let service = prompt("Какой дополнительный тип услуги нужен?");
    if (service === null) return sum;
    let price = checkTheInput("Сколько это будет стоить?", "1000");
    if (price === null) return sum;
    sum += price;
  }
  return sum;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

// переписал немного функцию по кайфу ба
const getTitle = function (t) {
  if (!t) return "";
  let trimmed = t.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const getServicePercentPrices = function () {
  return fullPrice - rollback;
};

// переписал немного функцию
function getRollbackMessage(price) {
  if (price < 0) return "Что то пошло не так";
  if (price === 0) return "Скидка не предусмотрена";
  if (price >= 30000) return "Даем скидку в 10%";
  if (price >= 15000 && price < 30000) return "Даем скидку в 5%";
  return "Скидка не предусмотрена";
}

function showTypeOf(v, name) {
  console.log(`Тип переменной ${name}: ${typeof v}`);
}

asking();

let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice();
let servicePercentPrice = getServicePercentPrices();

console.log("allServicePrices", allServicePrices);

showTypeOf(screenPrice, "screenPrice");
showTypeOf(allServicePrices, "allServicePrices");
showTypeOf(fullPrice, "fullPrice");
showTypeOf(servicePercentPrice, "servicePercentPrice");
showTypeOf(title, "title");
showTypeOf(screens, "screens");

console.log("Типы экранов для разработки:", screens);
console.log(getRollbackMessage(fullPrice));
console.log(
  `Стоимость за вычетом процента отката: ${getServicePercentPrices()} руб.`,
);
