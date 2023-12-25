const previouScreen = document.querySelector(".previous-screen");
const currentScreen = document.querySelector(".current-screen");
const buttons = document.querySelectorAll("button");
const footer = document.querySelector("footer");

let operator = null;
let currentValue = "";
let previousValue = "";
let numberOfOpertors = 0;
const currentYear = new Date().getFullYear();

footer.innerHTML = `Copyright &#169 mayorr-star ${currentYear}`;

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
  return num1 / 100 * num2;
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
      return divide(num1, num2);
    default:
      return remainder(num1, num2);
  }
};

const populateDisplay = (value, screen) => {
  if (screen.textContent === "0") {
    screen.textContent = ""
  }
  screen.textContent = value;
};

const handleNumber = (num) => {
  if (currentValue.length <= 10) {
    currentValue += num;
  }
};

const handleOperator = (op) => {
  operator = op;
  previousValue = currentValue;
  currentValue = ""
};

const clearAll = () => {
  currentScreen.textContent = "0";
  previouScreen.textContent = "0";
  operator = null;
  currentValue = "";
  previousValue = "";
};

const addDecimal = () => {
  if (!currentValue.includes(".")) {
    currentValue += "."
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (true) {
      case e.currentTarget.classList.contains("number-btn"):
        handleNumber(e.currentTarget.textContent);
        populateDisplay(currentValue, currentScreen);
        break;
      case e.currentTarget.classList.contains("operator-btn"):
        handleOperator(e.currentTarget.textContent);
        previouScreen.textContent += previousValue + " " + operator + " ";
        populateDisplay(operate(previousValue, operator, currentValue), currentScreen)
        populateDisplay(currentValue, currentScreen);
        break;
      case e.currentTarget.classList.contains("dot"):
        addDecimal()
        break;
      case e.currentTarget.getAttribute("id") === "solve":
        if (currentValue !== "" && previousValue !== "") {
          populateDisplay(operate(previousValue, operator, currentValue), currentScreen);
          populateDisplay("", previouScreen)
        }
        break;
      case e.currentTarget.getAttribute("id") === "all-clear":
        clearAll();
    }
  });
});