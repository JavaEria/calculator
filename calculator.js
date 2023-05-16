const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
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
