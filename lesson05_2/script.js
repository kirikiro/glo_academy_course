let arr = [
  "123123123",
  "12344124",
  "12454123",
  "13241355",
  "132555",
  "124445523",
  "123123123",
  "23123123",
  "452345",
  "234234",
];

arr.forEach((num) => {
  if (num[0] === "2" || num[0] === "4") {
    console.log(num);
  }
});

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

for (let n = 2; n <= 100; n++) {
  if (isPrime(n)) {
    console.log(`${n} — Делители этого числа: 1 и ${n}`);
  }
}
