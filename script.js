function convert() {
  var digits = [];
  var number = document.getElementById("numberInput").value;
  const firstOption = document.getElementById("firstOption").value;
  const secondOption = document.getElementById("secondOption").value;
  var resultSpace = document.getElementById("result");
  if (isNaN(number)) {
    resultSpace.innerText = "Invalid input. Please enter a number.";
    return;
  }
  const bases = {
    decimal: 10,
    binary: 2,
    octal: 8,
    hexadecimal: 16,
  };
  while (number >= bases[secondOption]) {
    var quotient = number % bases[secondOption];
    number = parseInt(number / bases[secondOption]);
    digits = [...digits, quotient];
  }
  console.log(number);
  if (number < bases[secondOption]) {
    digits = [...digits, number];
  }
  console.log(number, digits, quotient);
  digits = sortDigits(digits);
  resultSpace.innerText = `Result:${digits.join("")}`;
}
function sortDigits(digits) {
  console.log(digits);
  let i = digits.length;
  console.log(i);
  for (let j = 0; j < i - 1; j++) {
    var temp = digits[j];
    digits[j] = digits[i - 1];
    digits[i - 1] = temp;
    i--;
  }
  console.log(digits);
  return digits;
}
