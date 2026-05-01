const btn = document.getElementById("btn");
const square = document.getElementById("square");
const textInput = document.getElementById("text");

btn.addEventListener("click", () => {
  const color = textInput.value.trim();
  if (color) {
    square.style.backgroundColor = color;
  }
});

const eBtn = document.getElementById("e_btn");
if (eBtn) {
  eBtn.style.display = "none";
}

const range = document.getElementById("range");
const rangeSpan = document.getElementById("range-span");
const circle = document.getElementById("circle");

function updateCircleSize() {
  const val = range.value;
  rangeSpan.textContent = val;
  circle.style.width = val + "%";
  circle.style.height = val + "%";
}

range.addEventListener("input", updateCircleSize);
updateCircleSize();
