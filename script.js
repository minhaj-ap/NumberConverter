let steps2 = [];
var result;
function convert() {
  var digits = [];
  result = null;
  steps2 = [];
  var totalNumber = document.getElementById("numberInput").value;
  const firstOption = document.getElementById("firstOption").value;
  const secondOption = document.getElementById("secondOption").value;
  var resultSpace = document.getElementById("result");
  var stepsSpace = document.getElementById("steps");
  stepsSpace.innerHTML = "";
  let fractionResults=[]
  const bases = {
    decimal: 10,
    binary: 2,
    octal: 8,
    hexadecimal: 16,
  };
  const first = bases[firstOption];
  const second = bases[secondOption];
  let steps = [];
  var number;
  var fraction;
   if (totalNumber.includes('.')) {
    totalNumber= totalNumber.split('.')
    number=totalNumber[0]
    fraction= totalNumber[1]
  } else {
    number =totalNumber
   }
  if (isNaN(number) && !(first == 16 || second == 16)) {
    resultSpace.innerText = "Invalid input. Please enter a number.";
    return;
  }
  if(fraction){FractionToDecimal()}
  if (first == 16) {
    HexaDecimalConversion(number);
  }
  if (first == 10) {
    ConversionFromDecimal();
  } else if ((second == 10 || first == 8) && first != 16) {
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
      steps2.push(`${numbers[i]}x${first}^${i}=${numbers[i] * first ** i}`);
      numbers[i] = numbers[i] * first ** i;
      result += numbers[i];
    }
  }
function FractionToDecimal(){
fraction= parseFloat(`0.${fraction}`)
let count =0;
while (fraction != parseInt(fraction)) {
if(count===6){break}
fraction= fraction * second 
parts = fraction.toString().split('.')
fraction =parseFloat(`0.${parts[1]}`)
fractionResults=[...fractionResults,parts[0]]
count++
}
fractionResults= fractionResults.join('')
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
  steps2 = sortDigits(steps2);
  steps2.forEach((step) => {
    var text = document.createElement("h3");
    text.textContent = step;
    stepsSpace.appendChild(text);
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
function HexaDecimalConversion(number) {
  const hexNumberValues = {
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
  let digits = number.split("");
  digits.forEach((digit) => {
    digits[digits.indexOf(digit)] = hexNumberValues[digit];
  });
  digits = sortDigits(digits);
  result = 0;
  for (let i = 0; i < digits.length; i++) {
    steps2.push(`${digits[i]}x16^${i}=${digits[i] * 16 ** i}`);
    digits[i] = digits[i] * 16 ** i;
    result += digits[i];
  }
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
