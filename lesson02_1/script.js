let title = `Крутой проект 'Рога и копыта'`;
let screens = 'LCD, IPS, TFT, OLED, AMOLED, POLED, QLED, Ёмкостные, Резистивные';
let screenPrice = 2345615;
let rollback = 43;
let fullPrice = 4567379832723590;
let adaptive = true;

//типы
console.log(typeof(title), typeof(fullPrice), typeof(adaptive));
//длина
console.log(screens.length);
//строки
console.log(`Стоимость верстки экранов ${screenPrice} долларов`, 
  `\nСтоимость разработки сайта ${fullPrice} тубриков`);
//методы, которые привели строку к нижнему регистру и разделили строку по сепаратору
console.log(screens.toLowerCase().split(", "));
//процент отката
console.log(fullPrice * (rollback / 100));