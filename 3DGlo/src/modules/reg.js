document.addEventListener("DOMContentLoaded", () => {
  const calcInputs = document.querySelectorAll(
    ".calc-square, .calc-count, .calc-day",
  );
  calcInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  });
  const formInputs = document.querySelectorAll(
    "#form1 input, #form2 input, #form3 input",
  );

  formInputs.forEach((input) => {
    if (input.classList.contains("calc-item")) return;

    input.addEventListener("input", (e) => {
      const field = e.target;
      let regex;

      if (field.type === "text") {
        regex = /[^а-яё\s\-]/gi;
      } else if (field.type === "email") {
        regex = /[^a-z0-9@_.!~*'\-]/gi;
      } else if (field.type === "tel") {
        regex = /[^0-9()\-]/g;
      } else {
        return;
      }
      field.value = field.value.replace(regex, "");
    });
  });
});
