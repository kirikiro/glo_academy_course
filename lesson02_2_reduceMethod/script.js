let num = 266219;
let numToArray = num.toString().split('');

const sum = numToArray.reduce(function(accumulator, cur){
    return accumulator + cur;
}, 1);

console.log(`Произведение цифр числа ${num} равняется: ${sum}`);
console.log(`Возвели в степень: ${sum**3}`);
console.log(numToArray[0], numToArray[1]);