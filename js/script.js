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
  // новые переменные
  calculateBtn: null,
  resetBtn: null,
  addBtn: null,
  percentBlocks: null,
  numberBlocks: null,
  rangeInput: null,
  rangeValueSpan: null,
  totalBase: null,
  totalCount: null,
  totalOther: null,
  totalFull: null,
  totalRollback: null,
  screenBlocks: null,

  // Проверка числовая божественная
  isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // Проверка строки божественная
  isValidString(str) {
    if (!str || str.trim() === "") return false;
    return /[^\d\s]/.test(str);
  },

  checkTheInput(str, def) {
    let input;
    do {
      let raw = prompt(str, def);
      if (raw === null) {
        alert("введите значение");
        continue;
      }
      raw = raw.trim();
      if (raw === "") {
        alert("пустая строка. введите положительное число.");
        continue;
      }
      input = Number(raw);
      if (!appData.isNumber(input) || input <= 0) {
        alert("введите положительное число.");
      } else {
        return input;
      }
    } while (true);
  },

  checkTheString(str, def) {
    let result;
    do {
      let raw = prompt(str, def);
      if (raw === null) {
        alert("введите значение.");
        continue;
      }
      result = raw.trim();
      if (!appData.isValidString(result)) {
        alert(
          "вай братишка строка не может быть пустой или состоять только из цифр, введи текст (можно с цифрами).",
        );
        continue;
      }
      return result;
    } while (true);
  },

  getHTMLcontent() {
    // кнопки
    appData.calculateBtn = document.getElementsByClassName("handler_btn")[0];
    appData.resetBtn = document.getElementsByClassName("handler_btn")[1];
    appData.addBtn = document.querySelector(".screen-btn");
    console.log(appData.calculateBtn, appData.resetBtn, appData.addBtn);

    // other-items
    appData.percentBlocks = document.querySelectorAll(".other-items.percent");
    appData.numberBlocks = document.querySelectorAll(".other-items.number");
    console.log(
      `проценты: ${appData.percentBlocks.length}, число: ${appData.numberBlocks.length}`,
    );

    // input range и span
    appData.rangeInput = document.querySelector(
      ".rollback input[type='range']",
    );
    appData.rangeValueSpan = document.querySelector(".rollback .range-value");
    console.log(appData.rangeInput, appData.rangeValueSpan.textContent);

    // total-input инпуты
    const totalInputs = document.getElementsByClassName("total-input");
    appData.totalBase = totalInputs[0];
    appData.totalCount = totalInputs[1];
    appData.totalOther = totalInputs[2];
    appData.totalFull = totalInputs[3];
    appData.totalRollback = totalInputs[4];
    console.log(
      appData.totalBase,
      appData.totalCount,
      appData.totalOther,
      appData.totalFull,
      appData.totalRollback,
    );

    // блоки screen
    appData.screenBlocks = document.querySelectorAll(".screen");
    console.log(`screen: ${appData.screenBlocks.length}`);
  },

  asking() {
    // заголовок h1
    const h1Element = document.getElementsByTagName("h1")[0];
    appData.title = h1Element.textContent;
    console.log(appData.title);
    // appData.title = appData.checkTheString(
    //   "Как называется проект?",
    //   document.getElementsByTagName("h1")[0],
    // );
    // appData.title = appData.getTitle(appData.title);
    // console.log(appData.title);

    appData.screens = appData.checkTheString(
      "Какие типы экранов нужно разработать?",
      "хорошие, плохие",
    );

    appData.screenPrice = appData.checkTheInput(
      "Сколько будет стоить данная работа?",
      "120000",
    );

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getAllServicePrices() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let service = appData.checkTheString(
        "Какой дополнительный тип услуги нужен?",
        "дизайн",
      );
      let price = appData.checkTheInput("Сколько это будет стоить?", "1000");
      sum += price;
      if (i === 0) appData.service1 = service;
      else appData.service2 = service;
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
    if (price < 0) return "Что-то пошло не так";
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
    console.log(
      `Стоимость за вычетом процента отката: ${appData.getServicePercentPrices()} руб.`,
    );

    console.log("Все свойства и методы объекта appData");
    for (let key in appData) {
      if (typeof appData[key] === "function") {
        console.log(`${key}: [method]`);
      } else {
        console.log(`${key}: ${appData[key]}`);
      }
    }
  },

  start() {
    console.log('getHTMLcontent - новый блок с работой с селекторами');
    appData.getHTMLcontent();
    console.log('---------------------');
    appData.asking();
    console.log('---------------------');
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
  },
};

appData.start();
