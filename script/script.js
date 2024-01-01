const numbersScreen = document.querySelector(".numbers-screen");
const resultScreen = document.querySelector(".result-screen");
const buttons = document.querySelectorAll("button");
const footer = document.querySelector("footer");

let operator = null;
let result = null;
let numberOfOperators = 0;
let numberValue = "";
let currentNumber = "";
let previousNumber = "";
const currentYear = new Date().getFullYear();
const operators = [];
const numbers = [];

footer.innerHTML = `Copyright &#169 mayorr-star ${currentYear}`;
window.addEventListener("keydown", (e) => addKeyboardSupport(e));

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const findPercentage = (num1, num2) => {
  return (num1 / 100) * num2;
};

const operate = (num1, operator, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      if (num2 === 0) {
        return (result = "Can't divide by zero");
      } else {
        return divide(num1, num2);
      }
    default:
      return findPercentage(num1, num2);
  }
};

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

const handleNumber = (num) => {
  displayNumber(num);
  if (currentNumber.length <= 10) {
    populateDisplay(numberValue, numbersScreen);
  }
};

const displayNumber = (num) => {
  currentNumber += num;
  numberValue = num;
};

const handleOperator = (op) => {
  selectOperator(op);
  numbers.push(previousNumber);
  if (numberOfOperators > 1) {
    solveChainOfNumbers(numbers);
    populateDisplay(result, resultScreen);
  }
  populateDisplay(` ${operator} `, numbersScreen);
};

const selectOperator = (op) => {
  numberOfOperators++;
  operators.push(op);
  operator = op;
  previousNumber = currentNumber;
  currentNumber = "";
};

const populateDisplay = (value, screen) => {
  if (screen === numbersScreen) {
    screen.textContent += value;
  } else {
    screen.textContent = value;
  }
};

const solveChainOfNumbers = (array) => {
  result = array.reduce((previousResult, currentNum) => {
    return roundResult(operate(previousResult, operators[operators.length - 2], currentNum));
  });
  array.splice(0, 2, result.toString());
};

const clearAll = () => {
  resultScreen.textContent = "";
  numbersScreen.textContent = "";
  currentNumber = "";
  previousNumber = "";
  operator = null;
  result = null;
  numberOfOperators = 0;
  numbers.length = 0;
  operators.length = 0;
};

const addDecimal = () => {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
  populateDisplay(".", numbersScreen);
};

const solveOperation = () => {
  if (currentNumber !== "" && previousNumber !== "") {
    if (numberOfOperators > 1) {
      result = roundResult(operate(result, operator, currentNumber));
    } else {
      result = roundResult(operate(previousNumber, operator, currentNumber));
    }
    populateDisplay(result, resultScreen);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (true) {
      case e.currentTarget.classList.contains("number-btn"):
        handleNumber(button.textContent);
        break;
      case e.currentTarget.classList.contains("operator-btn"):
        handleOperator(button.textContent);
        break;
      case e.currentTarget.classList.contains("dot"):
        addDecimal();
        break;
      case e.currentTarget.getAttribute("id") === "solve":
        solveOperation();
        break;
      case e.currentTarget.getAttribute("id") === "all-clear":
        clearAll();
        break;
    }
  });
});

//Keyboard Support

function convertOperator(op) {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "x";
    case "/":
      return "÷";
    case "%":
      return "%";
  }
}

function addKeyboardSupport(e) {
  e.preventDefault();
  switch (true) {
    case e.key >= 0 && e.key <= 9:
      handleNumber(e.key);
      break;
    case e.key === "+":
    case e.key === "-":
    case e.key === "*":
    case e.key === "/":
    case e.key === "%":
      handleOperator(convertOperator(e.key));
      break;
    case e.key === ".":
      addDecimal();
      break;
    case e.key === "Enter":
      solveOperation();
      break;
    case e.key === "Escape":
      clearAll();
      break;
  }
}
