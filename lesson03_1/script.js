let title = prompt("Как называется проект?");
let screens = Number(prompt("Какие типы экранов нужно разработать?"));
let screenPrice = Number(prompt("Сколько будет стоить данная работа?"));
let adaptive = confirm("Нужен ли адаптив на сайте?");

let rollback = 1500; // откат

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = Number(prompt("Сколько это будет стоить?"));
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = Number(prompt("Сколько это будет стоить?"))

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

servicePercentPrice = Math.round(fullPrice - rollback);
console.log(fullPrice);
console.log(servicePercentPrice);

function fullPriceIfElse(fullPrice) {
if (fullPrice < 0) {
    return "Что то пошло не так";
} else if (fullPrice === 0) {
    return "Скидка не предусмотрена"; // вариант для 0
} else if (fullPrice >= 30000) {
    return "Даем скидку в 10%";
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    return "Даем скидку в 5%";
} else if (fullPrice > 0 && fullPrice < 15000) {
    return "Скидка не предусмотрена";
}
}

console.log(fullPriceIfElse(fullPrice));