const bases = {
  decimal: 10,
  binary: 2,
  octal: 8,
  hexadecimal: 16,
};
var result;
let fractionResults = null;
var digits = [];
let steps2 = [];
let steps = [];
let fractionSteps = [];
var number;
var fraction;
function convert() {
  result = null;
  digits = [];
  steps = [];
  steps2 = [];
  fractionSteps = [];
  var totalNumber = document.getElementById("numberInput").value;
  const firstOption = document.getElementById("firstOption").value;
  const secondOption = document.getElementById("secondOption").value;
  var resultSpace = document.getElementById("result");
  var stepsSpace = document.getElementById("steps");
  var steps2Space = document.getElementById("steps_2");
  stepsSpace.innerHTML = "";
  steps2Space.innerHTML = "";
  const first = bases[firstOption];
  const second = bases[secondOption];
  if (totalNumber.includes(".")) {
    totalNumber = totalNumber.split(".");
    number = totalNumber[0];
    fraction = totalNumber[1];
  } else {
    number = totalNumber;
  }
  if (isNaN(number) && !(first == 16 || second == 16)) {
    resultSpace.innerText = "Invalid input. Please enter a number.";
    return;
  }
  if (fraction) {
    if (first == 10) {
      FractionToDecimal(fraction, second);
    } else if (second == 10) {
      FractionFromDecimal(fraction, first);
    }
  }
  if (first == 10) {
    ConvertFromDecimal(number, second);
  } else if (second == 10) {
    ConvertToDecimal(number, first);
  }
  htmlThings(stepsSpace, steps2Space, second);
  resultSpace.innerText = `Result:${result + fractionResults}`;
}
function ConvertFromDecimal(number, second) {
  while (number >= second) {
    var quotient = number % second;
    steps.push([number, quotient]);
    number = parseInt(number / second);
    digits = [...digits, decimalToHex(quotient)];
  }
  if (number < second) {
    steps.push([number]);
    digits = [...digits, decimalToHex(number)];
  }
  digits = sortDigits(digits);
  result = digits.join("");
}
function ConvertToDecimal(number, first) {
  number = number.split("");
  let numbers = sortDigits(number);
  result = 0;
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = hexToDecimal(numbers[i]);
    steps2.push(`${numbers[i]}x${first}^${i}=${numbers[i] * first ** i}`);
    numbers[i] = numbers[i] * first ** i;
    result += numbers[i];
  }
}
function FractionFromDecimal(fraction, first) {
  fractionResults = 0;
  fraction = fraction.split("");
  for (let i = 0; i < fraction.length; i++) {
    fraction[i] = hexToDecimal(fraction[i]);
    fractionResults += fraction[i] * first ** -(i + 1);
    fractionSteps.push(
      `${fraction[i]}x${first}^-${i + 1}=${fraction[i] * first ** -(i + 1)}`
    );
  }
}
function FractionToDecimal(fraction, second) {
  fractionResults = ["."];
  fraction = parseFloat(`0.${fraction}`);
  let count = 0;
  while (fraction != parseInt(fraction)) {
    if (count === 6) {
      break;
    }
    fractionSteps.push(
      `${fraction}x${second}=${fraction * second} >>> ${parseInt(
        fraction * second
      )}`
    );
    fraction = fraction * second;
    parts = fraction.toString().split(".");
    fraction = parseFloat(`0.${parts[1]}`);
    fractionResults = [...fractionResults, decimalToHex(parts[0])];
    count++;
  }
  fractionResults = fractionResults.join("");
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
function decimalToHex(number) {
  // number in string
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
  return hexValues[number];
}
function hexToDecimal(number) {
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
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };
  return hexValues[number];
}
function htmlThings(stepsSpace, steps2Space, second) {
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
  steps2 = sortDigits(steps2);
  steps2.forEach((step) => {
    var text = document.createElement("h3");
    text.textContent = step;
    stepsSpace.appendChild(text);
  });
  fractionSteps.forEach((step) => {
    var text = document.createElement("h3");
    text.textContent = step;
    steps2Space.appendChild(text);
  });
}
