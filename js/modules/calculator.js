import { animate } from "./helpers";

export const calculate = () => {
  const pageContext = document.querySelector(".balkony");
  const calcContainer = document.getElementById("calc");

  if (!pageContext || !calcContainer) return;

  const elements = {
    size: document.getElementById("calc-input"),
    output: document.getElementById("calc-total"),
    design: document.getElementById("calc-type"),
    substance: document.getElementById("calc-type-material"),
  };

  const processCalculation = () => {
    const designPrice = parseFloat(elements.design.value) || 0;
    const substancePrice = parseFloat(elements.substance.value) || 0;
    const sizeValue = parseFloat(elements.size.value) || 0;

    const finalCost = designPrice * substancePrice * sizeValue;

    if (finalCost > 0) {
      animate({
        duration: 1000,
        timing: (time) => time,
        draw: (progress) => {
          elements.output.textContent = Math.trunc(progress * finalCost);
        },
      });
    } else {
      elements.output.textContent = "0";
    }
  };

  const triggerUpdate = (event) => {
    const activeNode = event.target;
    const validNodes = [elements.design, elements.substance, elements.size];

    if (validNodes.includes(activeNode)) {
      processCalculation();
    }
  };

  calcContainer.addEventListener("change", triggerUpdate);
  calcContainer.addEventListener("input", triggerUpdate);
};
