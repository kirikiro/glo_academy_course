let lang = prompt('выберите язык "ru" или "en"');
let daysEng = [
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let daysRu = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

function weekdayIf() {
  if (lang === "ru") {
    for (let i = 0; i < daysRu.length; i++) {
      console.log(daysRu[i]);
    }
  } else if (lang === "en") {
    for (let i = 0; i < daysEng.length; i++) {
      console.log(daysEng[i]);
    }
  } else {
    console.log("переделывай");
  }
}

weekdayIf();

console.log('--------');

function weekdayCase() {
  switch (lang) {
    case "ru": {
      for (let i = 0; i < daysRu.length; i++) {
        console.log(daysRu[i]);
      }
      break;
    }
    case "en": {
      for (let i = 0; i < daysEng.length; i++) {
        console.log(daysEng[i]);
      }
      break;
    }
    default:
      {
        console.log("переделывай");
      }
      break;
  }
}

weekdayCase();
console.log('--------');

const days = {
  ru: daysRu,
  en: daysEng,
};

function getDayWithoutIfCase() {
  days[lang].forEach((day) => {
    console.log(day);
  });
}

getDayWithoutIfCase();