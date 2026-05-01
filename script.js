const booksContainer = document.querySelector(".books");
let books = Array.from(booksContainer.children);

function getBookNumber(book) {
  const link = book.querySelector("h2 a");
  if (!link) return 0;
  const text = link.textContent;
  const prefix = "Книга ";
  const start = text.indexOf(prefix);
  if (start === -1) return 0;
  let numStart = start + prefix.length;
  let numEnd = numStart;
  while (numEnd < text.length && "0123456789".includes(text[numEnd])) {
    numEnd++;
  }
  if (numEnd === numStart) return 0;
  const numberStr = text.slice(numStart, numEnd);
  return parseInt(numberStr, 10);
}

books.sort((a, b) => getBookNumber(a) - getBookNumber(b));
books.forEach((book) => booksContainer.appendChild(book));

books = Array.from(booksContainer.children);

//Заменить картинку заднего фона на другую из папки image
function setBackground() {
  document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";
}
setBackground();

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
function fixBook3Title() {
  const currentBooks = document.querySelectorAll(".book");
  const book3 = currentBooks[2];
  if (book3) {
    const link = book3.querySelector("h2 a");
    if (link && link.textContent.includes("Пропопипы Объектов")) {
      link.textContent = link.textContent.replace(
        "Пропопипы Объектов",
        "Прототипы Объектов",
      );
    }
  }
}
fixBook3Title();

// Удалить рекламу со страницы
function deleteAdv() {
  const adv = document.querySelector(".adv");
  if (adv) adv.remove();
}
deleteAdv();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const orderForBook2 = [
  "Введение",
  "Предисловие",
  "Приложение C: Лексический this",
  "Глава 1: Что такое область видимости?",
  "Глава 4: Поднятие переменных (Hoisting)",
  "Глава 5: Замыкание области видимости",
  "Глава 2: Лексическая область видимости",
  "Приложение A: Динамическая область видимости",
  "Глава 3: Область видимости: функции против блоков",
  "Приложение B: Полифиллинг блочной области видимости",
  "Приложение D: Благодарности!",
];

// Правильный порядок для пятой книги (индекс 4)
const orderForBook5 = [
  "Введение",
  "Предисловие",
  "Глава 1: Асинхронность: Сейчас и Тогда",
  "Глава 2: Колбеки",
  "Глава 3: Обещания",
  "Глава 4: Генераторы",
  "Глава 5: Производительность программы",
  "Глава 6: Бенчмаркинг и настройка",
  "Приложение A: Библиотека: asynquence",
  "Приложение B: Расширенные асинхронные шаблоны",
  "Приложение C: Благодарности!",
];

function reorderChapters(bookIndex, correctOrder) {
  const book = document.querySelectorAll(".book")[bookIndex];
  if (!book) return;
  const ul = book.querySelector("ul");
  if (!ul) return;
  const items = Array.from(ul.children);
  correctOrder.forEach((title) => {
    const element = items.find((li) => li.textContent.trim() === title);
    if (element) ul.appendChild(element);
  });
}

reorderChapters(1, orderForBook2); // вторая книга
reorderChapters(4, orderForBook5); // пятая книга

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
function addChapterToBook6() {
  const currentBooks = document.querySelectorAll(".book");
  const book6 = currentBooks[5];
  if (!book6) return;
  const ul6 = book6.querySelector("ul");
  if (!ul6) return;
  const appendix = Array.from(ul6.children).find((li) =>
    li.textContent.includes("Приложение A"),
  );
  const newChapter = document.createElement("li");
  newChapter.textContent = "Глава 8: За пределами ES6";
  if (appendix) {
    ul6.insertBefore(newChapter, appendix);
  } else {
    ul6.appendChild(newChapter);
  }
}
addChapterToBook6();
