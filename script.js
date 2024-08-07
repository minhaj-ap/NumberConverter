function convert() {
  var digits = [];
  let result;
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
  const first = bases[firstOption];
  const second = bases[secondOption];
  if (first == 10) {
    ConversionFromDecimal();
  } else if (second == 10) {
    ConvertToDecimal();
  } else if (first == 2 && second == 8) {
    BinaryToOctal();
  }
  function ConversionFromDecimal() {
    while (number >= second) {
      var quotient = number % second;
      number = parseInt(number / second);
      digits = [...digits, quotient];
    }
    if (number < second) {
      digits = [...digits, number];
    }
    digits = sortDigits(digits);
    result = digits.join("");
  }
  function ConvertToDecimal() {
    number = number.split("");
    let numbers = sortDigits(number);
    result = 0;
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = numbers[i] * first ** i;
      result += numbers[i];
    }
  }
  resultSpace.innerText = `Result:${result}`;
}
function sortDigits(digits) {
  let i = digits.length;
  for (let j = 0; j < i - 1; j++) {
    var temp = digits[j];
    digits[j] = digits[i - 1];
    digits[i - 1] = temp;
    i--;
  }
  return digits;
}
