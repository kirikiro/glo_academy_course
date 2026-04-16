let num = 266219;
let numToArray = num.toString().split('');
let multipicationOfNum = 1;
for (let i = 0; i < numToArray.length; i++) {
    multipicationOfNum *= numToArray[i];
}
console.log(`Произведение цифр числа ${num} равняется: ${multipicationOfNum}`);
console.log(`Возвели в степень: ${multipicationOfNum**3}`);
console.log(numToArray[0], numToArray[1]);