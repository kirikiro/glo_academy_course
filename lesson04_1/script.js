"use strict";

let title = prompt("Как называется проект?");
let screens = Number(prompt("Какие типы экранов нужно разработать?"));
let screenPrice = Number(prompt("Сколько будет стоить данная работа?"));
let adaptive = confirm("Нужен ли адаптив на сайте?");

let rollback = 1500; // откат

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = Number(prompt("Сколько это будет стоить?"));
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = Number(prompt("Сколько это будет стоить?"));

// 1
const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices();

// 2
function getFullPrice() {
  return screenPrice + allServicePrices;
}
let fullPrice = getFullPrice();

// 3
const getTitle = function (t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
};

// 4
const getServicePercentPrices = function () {
  return fullPrice - rollback;
};
let servicePercentPrice = getServicePercentPrices();

function getRollbackMessage(price) {
  if (price < 0) {
    return "Что то пошло не так";
  } else if (price === 0) {
    return "Скидка не предусмотрена"; // вариант для 0
  } else if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price > 0 && price < 15000) {
    return "Скидка не предусмотрена";
  }
}

function showTypeOf(v, name) {
  console.log(`Тип переменной ${name}: ${typeof v}`);
}

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
