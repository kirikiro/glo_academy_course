function guessTheNumber() {
  alert("ИГРА УГАДАЙ ЧИСЛО ЧТО ЗАГАДАЛ, УГАДАЕШЬ - ВЕК ЗДОРОВЬЯ И СЧАСТЬЯ");
  const secret = Math.floor(Math.random() * 100) + 1;
  let attemptsLeft = 10;

  // Рекурсия родная.............
  function ask() {
    if (attemptsLeft <= 0) {
      const playAgain = confirm(
        "Попытки закончились, бывает.. может хватит играть в казик этот?",
      );
      if (playAgain) {
        guessTheNumber()();
      } else {
        alert("гейм овер броу...");
      }
      return;
    }

    let userInput = prompt(
      `Угадай число от 1 до 100. Осталось попыток: ${attemptsLeft}`,
    );

    if (userInput === null) {
      let c = confirm(`у меня твой айпи ip, может еще раз?`);
      if (c){
        guessTheNumber()();
      } else{
        alert("...");
        alert("ты плохой..");
        return;
      }
    }

    const number = Number(userInput);
    if (isNaN(number) || userInput.trim() === "") {
      alert("Введи число!");
      ask();
      return;
    }

    if (number === secret) {
      const playAgain = confirm("иншаллах сто лет здоровья ты угадал, давай еще разок братик");
      if (playAgain) {
        guessTheNumber()(); // перезапуск
      } else {
        alert("пока");
      }
      return;
    }
    attemptsLeft--;

    if (attemptsLeft === 0) {
      const playAgain = confirm(
        "Попытки закончились, бывает.. может хватит играть в казик этот?",
      );
      if (playAgain) {
        guessTheNumber()();
      } else {
        alert("пока");
      }
      return;
    }

    if (number < secret) {
      alert(`Загаданное число up, осталось попыток: ${attemptsLeft}`);
    } else {
      alert(`Загаданное число down, осталось попыток: ${attemptsLeft}`);
    }
    ask();
  }

  return ask;
}

// let ip = fetch('https://api.ipify.org?format=json')
//   .then(response => response.json())
//   .then(data => console.log('Ваш IP:', data.ip))
//   .catch(error => console.error('Ошибка:', error));

guessTheNumber()();
