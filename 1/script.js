"use strict";

const appData = {
  rollback: 1500,
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: false,
  service1: "",
  service2: "",
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  checkTheInput(str, def) {
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
      if (!appData.isNumber(input) || input <= 0) {
        alert("Ошибка, введите положительное число.");
      }
    } while (!appData.isNumber(input) || input <= 0);
    return input;
  },

  asking() {
    appData.title = prompt("Как называется проект?", "абоба");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "хорошие, плохие");
    appData.screenPrice = appData.checkTheInput("Сколько будет стоить данная работа?", "120000");
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    appData.title = appData.getTitle(appData.title);
  },

  getAllServicePrices() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let service = prompt("Какой дополнительный тип услуги нужен?");
      if (service === null) return sum;
      let price = appData.checkTheInput("Сколько это будет стоить?", "1000");
      if (price === null) return sum;
      sum += price;
    }
    return sum;
  },

  getFullPrice() {
    return appData.screenPrice + appData.allServicePrices;
  },

  getTitle(t) {
    if (!t) return "";
    let trimmed = t.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  },

  getServicePercentPrices() {
    return appData.fullPrice - appData.rollback;
  },

  getRollbackMessage(price) {
    if (price < 0) return "Что то пошло не так";
    if (price === 0) return "Скидка не предусмотрена";
    if (price >= 30000) return "Даем скидку в 10%";
    if (price >= 15000 && price < 30000) return "Даем скидку в 5%";
    return "Скидка не предусмотрена";
  },

  showTypeOf(v, name) {
    console.log(`Тип переменной ${name}: ${typeof v}`);
  },

  logger() {
    console.log("allServicePrices", appData.allServicePrices);
    appData.showTypeOf(appData.screenPrice, "screenPrice");
    appData.showTypeOf(appData.allServicePrices, "allServicePrices");
    appData.showTypeOf(appData.fullPrice, "fullPrice");
    appData.showTypeOf(appData.servicePercentPrice, "servicePercentPrice");
    appData.showTypeOf(appData.title, "title");
    appData.showTypeOf(appData.screens, "screens");
    console.log("Типы экранов для разработки:", appData.screens);
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(`Стоимость за вычетом процента отката: ${appData.getServicePercentPrices()} руб.`);

    console.log("\n=== Все свойства и методы объекта appData");
    for (let key in appData) {
      if (typeof appData[key] === "function") {
        console.log(`${key}: [method]`);
      } else {
        console.log(`${key}: ${appData[key]}`);
      }
    }
  },

  start() {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
  }
};

appData.start();