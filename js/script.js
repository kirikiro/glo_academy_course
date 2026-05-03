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
    this.calculateBtn = document.getElementsByClassName("handler_btn")[0];
    this.resetBtn = document.getElementsByClassName("handler_btn")[1];
    this.addBtn = document.querySelector(".screen-btn");

    this.percentBlocks = document.querySelectorAll(".other-items.percent");
    this.numberBlocks = document.querySelectorAll(".other-items.number");

    this.rangeInput = document.querySelector(".rollback input[type='range']");
    this.rangeValueSpan = document.querySelector(".rollback .range-value");

    const totalInputs = document.getElementsByClassName("total-input");
    this.totalBase = totalInputs[0];
    this.totalCount = totalInputs[1];
    this.totalOther = totalInputs[2];
    this.totalFull = totalInputs[3];
    this.totalRollback = totalInputs[4];

    this.screenBlocks = document.querySelectorAll(".screen");
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
    if (!this.rangeInput || !this.rangeValueSpan) return;
    const updateDisplay = () => {
      const val = this.rangeInput.value;
      this.rangeValueSpan.textContent = val + "%";
      this.rollback = parseInt(val, 10);
    };

    this.rangeInput.addEventListener("input", () => {
      updateDisplay();

      if (this.isCalculated) {
        this.updateRollbackOnly();
      }
    });
    updateDisplay();
  },

  updateRollbackOnly() {
    if (this.baseFullPrice === 0) return;
    const discount = this.baseFullPrice * (this.rollback / 100);
    this.servicePercentPrice = this.baseFullPrice - discount;
    this.totalRollback.value = this.servicePercentPrice;
  },

  bindAddScreen() {
    if (!this.addBtn) return;
    const originalScreen = document.querySelector(".screen");
    if (!originalScreen) return;

    this.addBtn.addEventListener("click", () => {
      const newScreen = originalScreen.cloneNode(true);
      const select = newScreen.querySelector("select");
      select.selectedIndex = 0;
      const input = newScreen.querySelector("input[type='text']");
      input.value = "";
      const parent = this.addBtn.parentNode;
      parent.insertBefore(newScreen, this.addBtn);
      this.isCalculated = false;
      this.baseFullPrice = 0;
    });
  },

  collectScreensData() {
    const screenDivs = document.querySelectorAll(".screen");
    this.screens = [];
    let totalCount = 0;
    let totalPrice = 0;
    screenDivs.forEach((div) => {
      const select = div.querySelector("select");
      const price = parseInt(select.value, 10);
      const type = select.options[select.selectedIndex].text;
      const count = parseInt(div.querySelector("input[type='text']").value, 10);
      this.screens.push({ type, price, count });
      totalCount += count;
      totalPrice += price * count;
    });
    this.totalCount.value = totalCount;
    this.totalBase.value = totalPrice;
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
    this.totalOther.value = sum;
    return sum;
  },

  performCalculation() {
    if (!this.checkScreensFilled()) return;
    const screensCost = this.collectScreensData();
    const additionalCost = this.collectAdditionalServices();
    this.baseFullPrice = screensCost + additionalCost;
    this.fullPrice = this.baseFullPrice;
    this.totalFull.value = this.fullPrice;
    this.isCalculated = true;
    this.updateRollbackOnly();
  },

  toggleState(isCalculated) {
    document.querySelectorAll("input[type='text'], select").forEach((elem) => {
      elem.disabled = isCalculated;
    });

    this.calculateBtn.style.display = isCalculated ? "none" : "block";
    this.resetBtn.style.display = isCalculated ? "block" : "none";
  },

  // Обработчик кнопки рассчитать
  bindCalculate() {
    if (!this.calculateBtn) return;
    this.calculateBtn.addEventListener("click", () => {
      this.performCalculation();
      this.toggleState(true);
    });
  },

  reset() {
    this.rollback = 0;
    this.screens = [];
    this.additionalServicesPrice = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.isCalculated = false;
    this.baseFullPrice = 0;

    document
      .querySelectorAll("input[type='text']")
      .forEach((el) => (el.value = ""));
    document.querySelectorAll("select").forEach((el) => (el.selectedIndex = 0));

    document.querySelectorAll(".screen").forEach((el, i) => {
      if (i > 0) el.remove();
    });

    document.querySelectorAll(".other-items").forEach((item) => {
      const cb = item.querySelector(".custom-checkbox");
      const price = item.querySelector("input[type='text']");
      if (cb) cb.checked = false;
      if (price) price.value = "";
    });

    if (this.totalBase) this.totalBase.value = "";
    if (this.totalCount) this.totalCount.value = "";
    if (this.totalOther) this.totalOther.value = "";
    if (this.totalFull) this.totalFull.value = "";
    if (this.totalRollback) this.totalRollback.value = "";

    this.toggleState(false);

    if (this.rangeInput) {
      this.rangeInput.value = 0;
      if (this.rangeValueSpan) this.rangeValueSpan.textContent = "0%";
    }
  },

  start() {
    this.getHTMLcontent();
    this.initRange();
    this.bindAddScreen();
    this.bindCalculate();

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.reset());
      this.resetBtn.style.display = "none";
    }
  },
};

appData.start();
