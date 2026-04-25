const week = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
];

const today = new Date().getDay();
const currentIndex = (today + 6) % 7;

week.forEach((day, index) => {
  const isCurrent = (index === currentIndex);
  const isWeekend = (index === 5 || index === 6);

  if (isCurrent && isWeekend) {
    console.log(`%c${day}`, 'font-weight: bold; font-style: italic;');
  } else if (isCurrent) {
    console.log(`%c${day}`, 'font-weight: bold;');
  } else if (isWeekend) {
    console.log(`%c${day}`, 'font-style: italic;');
  } else {
    console.log(day);
  }
});