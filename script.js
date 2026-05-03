function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.create = function (text = "Элемент") {
  let el;

  if (this.selector.startsWith(".")) {
    el = document.createElement("div");
    el.className = this.selector.slice(1);
  } else if (this.selector.startsWith("#")) {
    el = document.createElement("p");
    el.id = this.selector.slice(1);
  } else {
    el = document.createElement("div");
  }

  el.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;
    text-align: center;
  `;

  el.textContent = text;
  return el;
};

// точка
// const block = new DomElement('.my-block', 200, 300, 'tomato', 16);
// document.body.appendChild(block.create('Блок с классом'));

// решетка
// const para = new DomElement('#my-para', 300, 300, 'tomato', 16);
// document.body.appendChild(para.create('Параграф с id'));

//усложненное
document.addEventListener("DOMContentLoaded", () => {
  const square = new DomElement(".square", 100, 100, "tomato", 14);
  const el = square.create("усложненное задание с бегающим квадратом");

  // Позиционирование
  el.style.position = "absolute";
  el.style.left = "0px";
  el.style.top = "0px";

  document.body.appendChild(el);

  // Обработчик клавиш
  document.addEventListener("keydown", (e) => {
    const step = 10;
    let x = parseInt(el.style.left) || 0;
    let y = parseInt(el.style.top) || 0;

    switch (e.key) {
      case "ArrowUp":
        y -= step;
        break;
      case "ArrowDown":
        y += step;
        break;
      case "ArrowLeft":
        x -= step;
        break;
      case "ArrowRight":
        x += step;
        break;
      default:
        return;
    }

    el.style.left = x + "px";
    el.style.top = y + "px";
  });
});
