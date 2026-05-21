// возвращает массив значений, у которых typeof совпадает с указанным типом данных
const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  // скрывает все блоки ответов на странице с селектором  div.dialog__response-block
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block"),
    );
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  // показывает нужный блок. при необходимости подставляет текст в <span>
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    document.querySelector(blockSelector).style.display = "block";
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // обертки для вывода сообщений об ошибке, успехе или отсутствии данных
  showError = (msgText) =>
    // обертка для ошибки
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  showResults = (msgText) =>
    // обертка для успеха
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // обертка для отсутствия данных
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  // выполнить фильтрацию, форматирует результат и вызывает showResults или showError
  tryFilterByType = (type, values) => {
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      showResults(alertMsg);
    } catch (e) {
			// ошибка перехватывается в catch и показывается через showError
      showError(`Ошибка: ${e}`);
    }
  };

const filterButton = document.querySelector("#filter-btn");

// считываются значения из полей #type (желаемый тип) и #data (данные для фильтрации)
filterButton.addEventListener("click", (e) => {
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data");
  // если #data пустое то устанавливается сообщение валидации и вызывается showNoResults()
  if (dataInput.value === "") {
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    showNoResults();
  } else {
    dataInput.setCustomValidity("");
		//отливаем ошибки
    e.preventDefault();
		// вызывается filterByType
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
