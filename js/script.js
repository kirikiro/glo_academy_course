"use strict";

const appData = {
  rollback: 0,
  screens: [],
  additionalServicesPrice: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  // Флаг
  isCalculated: false,
  // базовая стоимость (без отката)
  baseFullPrice: 0,

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

  getHTMLcontent() {
    appData.calculateBtn = document.getElementsByClassName("handler_btn")[0];
    appData.resetBtn = document.getElementsByClassName("handler_btn")[1];
    appData.addBtn = document.querySelector(".screen-btn");

    appData.percentBlocks = document.querySelectorAll(".other-items.percent");
    appData.numberBlocks = document.querySelectorAll(".other-items.number");

    appData.rangeInput = document.querySelector(".rollback input[type='range']");
    appData.rangeValueSpan = document.querySelector(".rollback .range-value");

    const totalInputs = document.getElementsByClassName("total-input");
    appData.totalBase = totalInputs[0];
    appData.totalCount = totalInputs[1];
    appData.totalOther = totalInputs[2];
    appData.totalFull = totalInputs[3];
    appData.totalRollback = totalInputs[4];

    appData.screenBlocks = document.querySelectorAll(".screen");
  },

  checkScreensFilled() {
    const screens = document.querySelectorAll(".screen");
    if (screens.length === 0) {
      alert("Добавьте хотя бы один тип экрана");
      return false;
    }
    for (let i = 0; i < screens.length; i++) {
      const select = screens[i].querySelector("select");
      const input = screens[i].querySelector("input[type='text']");
      if (!select.value || select.value === "") {
        alert(`Блок экрана ${i + 1}: выберите тип экрана`);
        return false;
      }
      const count = parseInt(input.value, 10);
      if (isNaN(count) || count <= 0) {
        alert(
          `Блок экрана ${i + 1}: введите корректное количество (число > 0)`,
        );
        return false;
      }
    }
    return true;
  },

  initRange() {
    if (!appData.rangeInput || !appData.rangeValueSpan) return;
    const updateDisplay = () => {
      const val = appData.rangeInput.value;
      appData.rangeValueSpan.textContent = val + "%";
      appData.rollback = parseInt(val, 10);
    };

    appData.rangeInput.addEventListener("input", () => {
      updateDisplay();

      if (appData.isCalculated) {
        appData.updateRollbackOnly();
      }
    });
    updateDisplay();
  },

  updateRollbackOnly() {
    if (appData.baseFullPrice === 0) return;
    const discount = appData.baseFullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = appData.baseFullPrice - discount;
    appData.totalRollback.value = appData.servicePercentPrice;
  },

  bindAddScreen() {
    if (!appData.addBtn) return;
    const originalScreen = document.querySelector(".screen");
    if (!originalScreen) return;

    appData.addBtn.addEventListener("click", () => {
      const newScreen = originalScreen.cloneNode(true);
      const select = newScreen.querySelector("select");
      select.selectedIndex = 0;
      const input = newScreen.querySelector("input[type='text']");
      input.value = "";
      const parent = appData.addBtn.parentNode;
      parent.insertBefore(newScreen, appData.addBtn);
      appData.isCalculated = false;
      appData.baseFullPrice = 0;
    });
  },

  collectScreensData() {
    const screenDivs = document.querySelectorAll(".screen");
    appData.screens = [];
    let totalCount = 0;
    let totalPrice = 0;
    screenDivs.forEach((div) => {
      const select = div.querySelector("select");
      const price = parseInt(select.value, 10);
      const type = select.options[select.selectedIndex].text;
      const count = parseInt(div.querySelector("input[type='text']").value, 10);
      appData.screens.push({ type, price, count });
      totalCount += count;
      totalPrice += price * count;
    });
    appData.totalCount.value = totalCount;
    appData.totalBase.value = totalPrice;
    return totalPrice;
  },

  collectAdditionalServices() {
    let sum = 0;
    const allOtherItems = document.querySelectorAll(".other-items");
    allOtherItems.forEach((item) => {
      const checkbox = item.querySelector(".custom-checkbox");
      if (checkbox && checkbox.checked) {
        const priceInput = item.querySelector("input[type='text']");
        if (priceInput && priceInput.value) {
          let value = parseInt(priceInput.value, 10);
          if (!isNaN(value)) sum += value;
        }
      }
    });
    appData.totalOther.value = sum;
    return sum;
  },

  performCalculation() {
    if (!appData.checkScreensFilled()) return;
    const screensCost = appData.collectScreensData();
    const additionalCost = appData.collectAdditionalServices();
    appData.baseFullPrice = screensCost + additionalCost;
    appData.fullPrice = appData.baseFullPrice;
    appData.totalFull.value = appData.fullPrice;
    appData.isCalculated = true;
    appData.updateRollbackOnly();
  },

// Обработчик кнопки рассчитать
  bindCalculate() {
    if (!appData.calculateBtn) return;
    appData.calculateBtn.addEventListener("click", () => {
      appData.performCalculation();
    });
  },

  start() {
    appData.getHTMLcontent();
    appData.initRange();
    appData.bindAddScreen();
    appData.bindCalculate();
  },
};

appData.start();
