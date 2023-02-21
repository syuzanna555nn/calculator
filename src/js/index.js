const actionsButtons = [
  {
    id: "buttonClear",
    value: "C",
    type: "action",
    cancel: true
  },
  {
    id: "buttonBrackets",
    value: "()",
    type: "action",
    disabled: true
  },
  {
    id: "buttonPercent",
    value: "%",
    type: "action",
    disabled: true
  },
  {
    id: "buttonDivide",
    value: "/",
    type: "action",
    green: true
  },
  {
    id: "buttonSeven",
    value: "7",
    type: "button"
  },
  {
    id: "buttonEight",
    value: "8",
    type: "button"

  },
  {
    id: "buttonNine",
    value: "9",
    type: "button"
  },
  {
    id: "buttonMultiply",
    value: "*",
    type: "action",
    green: true
  },
  {
    id: "buttonFour",
    value: "4",
    type: "button"
  },
  {
    id: "buttonFive",
    value: "5",
    type: "button"
  },
  {
    id: "buttonSix",
    value: "6",
    type: "button"
  },
  {
    id: "buttonMinus",
    value: "-",
    type: "action",
    green: true
  },
  {
    id: "buttonOne",
    value: "1",
    type: "button"
  },
  {
    id: "buttonTwo",
    value: "2",
    type: "button"
  },
  {
    id: "buttonThree",
    value: "3",
    type: "button"
  },
  {
    id: "buttonPlus",
    value: "+",
    type: "action",
    green: true
  },
  {
    id: "buttonPlusMinus",
    value: "+/-",
    type: "action",
    disabled: true,
  },
  {
    id: "buttonZero",
    value: "0",
    type: "button"
  },
  {
    id: "buttonDot",
    value: ".",
    type: "action",
    disabled: true
  },
  {
    id: "buttonEqual",
    value: "=",
    type: "action",
    primary: true
  }
];

const actions = document.getElementById("actions");
const displayTotal = document.getElementById("displayTotal");
const displayHistory = document.getElementById("displayHistory");
let history = '';
let total = '';
let operation = '';

function evaluateMath(str) {
  // for (var i = 0; i < str.length; i++) {
  //   if (isNaN(str[i]) && !['+', '-', '/', '*'].includes(str[i])) {
  //     return NaN;
  //   }
  // }

  try {
    return eval(str)
  } catch (e) {
    if (e.name !== 'SyntaxError') throw e
    return NaN;
  }
}

actionsButtons.forEach((action) => {
  const htmlButton = document.createElement("button");
  htmlButton.setAttribute("id", action.id);
  htmlButton.setAttribute("class", "button");
  action.disabled && htmlButton.setAttribute("disabled", action.disabled);
  action.cancel && htmlButton.setAttribute("cancel", action.cancel);
  action.primary && htmlButton.setAttribute("primary", action.primary);
  action.green && htmlButton.setAttribute("green", action.green);

  htmlButton.innerHTML = action.value;
  actions.appendChild(htmlButton);
  const button = document.getElementById(action.id);
  button.addEventListener("click", () => {
    if (action.type === "button") {
      history += action.value;
      if (total && operation) {
        total = evaluateMath(history);
      } else {
        total += action.value;
      }

    } else {
      switch (action.value) {
        case "C":
          history = '';
          total = '';
          break;
        case "=":
          const localHistory = history.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
          const hasOperation = localHistory[localHistory.length-1].includes(['+', '-', '/', '*']);
          total = hasOperation ? evaluateMath(total.toString() + localHistory[localHistory.length-1]) : "";
          break;
        default:
          history += action.value;
          operation = action.value;
          break;
      }
    }
    displayTotal.innerHTML = total;
    displayHistory.innerHTML = history;
  });
})




