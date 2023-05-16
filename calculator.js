const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector("#decimal-button");
const calcButtonsList = document.querySelectorAll(".calc-buttons");
const enteredValue = document.querySelector("#entered-value");
const resultValue = document.querySelector("#result-value");
let aValue = "";
let bValue = "";
let result;
let currentOperand = "";

const methods = {
  "+": (a, b) => +a + +b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

clearButton.addEventListener("click", () => {
  enteredValue.textContent = "";
  resultValue.textContent = "";
  currentOperand = "";
  aValue = "";
  bValue = "";
});

deleteButton.addEventListener("click", () => {
  if (currentOperand === "") {
    aValue = removeDigit(aValue).toString();
    enteredValue.textContent = aValue;
  } else {
    bValue = removeDigit(bValue).toString();
    enteredValue.textContent = bValue;
  }
});

calcButtonsList.forEach((button) => {
  button.addEventListener("click", () => interpretButtons(button.textContent));
});

function interpretButtons(buttonText) {
  switch (true) {
    case (buttonText >= 0 && buttonText <= 9) || buttonText === ".":
      if (currentOperand === "") {
        aValue += buttonText;
        enteredValue.textContent += buttonText;
        if (buttonText === ".") decimalButton.disabled = true;
      } else {
        bValue += buttonText;
        enteredValue.textContent = bValue;
        if (buttonText === ".") decimalButton.disabled = true;
      }
      break;
    case buttonText in methods:
      if (aValue !== "" && bValue !== "") evaluateResult(buttonText, true);
      else {
        resultValue.textContent = `${aValue} ${buttonText}`;
        currentOperand = buttonText;
      }
      decimalButton.disabled = false;
      break;
    case buttonText === "x":
      if (aValue !== "" && bValue !== "") evaluateResult("x", true);
      else {
        resultValue.textContent = `${aValue} ${buttonText}`;
      }
      currentOperand = "*";
      decimalButton.disabled = false;
      break;
    case buttonText === "=":
      if (bValue) {
        evaluateResult("=", false);
      }
      break;
  }
}

roundToOneDecimal = (number) => Math.round(number * 10) / 10;

removeDigit = (number) => {
  number = number.slice(0, -1);
  if (number[number.length - 1] === ".") number = number.slice(0, -1);
  return number;
};

evaluateResult = (buttonValue, replaceScreenValue) => {
  if (currentOperand === "÷" && bValue === "0") {
    alert("You can't divide by 0!");
    return;
  }
  result = roundToOneDecimal(methods[currentOperand](aValue, bValue));
  if (result === Infinity || Number.isNaN(result)) {
    alert("Invalid Input !");
    return;
  }
  enteredValue.textContent = result;
  if (replaceScreenValue) {
    resultValue.textContent = ` ${result} ${buttonValue}`;
    currentOperand = buttonValue;
  } else {
    resultValue.textContent += ` ${bValue} ${buttonValue}`;
    currentOperand = "";
  }
  aValue = result;
  bValue = "";
  decimalButton.disabled = false;
};
