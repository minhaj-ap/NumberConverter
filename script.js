function convert() {
  var digits = [];
  let result;
  var number = document.getElementById("numberInput").value;
  const firstOption = document.getElementById("firstOption").value;
  const secondOption = document.getElementById("secondOption").value;
  var resultSpace = document.getElementById("result");
  var stepsSpace = document.getElementById("steps");
  stepsSpace.innerHTML = "";
  const bases = {
    decimal: 10,
    binary: 2,
    octal: 8,
    hexadecimal: 16,
  };
  const first = bases[firstOption];
  const second = bases[secondOption];
  let steps = [];
  if (isNaN(number) && !(first == 16 || second == 16)) {
    resultSpace.innerText = "Invalid input. Please enter a number.";
    return;
  }
  if (first == 16) {
    HexaDecimalConversion(number, first, second);
  }
  if (first == 10) {
    ConversionFromDecimal();
  } else if (second == 10 || first == 8) {
    ConvertToDecimal();
  } else if (first == 2 && second == 8) {
    BinaryToOctal();
  }
  function ConversionFromDecimal() {
    while (number >= second) {
      var quotient = number % second;
      steps.push([number, quotient]);
      number = parseInt(number / second);
      digits = [...digits, quotient];
    }
    if (number < second) {
      steps.push([number]);
      digits = [...digits, number];
    }
    digits = sortDigits(digits);
    result = numberConversionToHex(digits);
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

  steps.forEach((step) => {
    var base = document.createElement("h3");
    base.textContent = second;
    var number = document.createElement("p");
    number.textContent = step[0];
    var balance = document.createElement("span");
    balance.textContent = step[1];
    var container = document.createElement("div");
    container.appendChild(base);
    container.appendChild(number);
    container.appendChild(balance);
    stepsSpace.appendChild(container);
  });
  resultSpace.innerText = `Result:${result}`;
}
function numberConversionToHex(digits) {
  const hexValues = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  };
  digits.forEach((digit) => {
    digits[digits.indexOf(digit)] = hexValues[digit];
  });
  return digits.join("");
}
function HexaDecimalConversion(number, first, second) {

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
