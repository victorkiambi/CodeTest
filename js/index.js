//Initialize buttons

const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

const currentScreenTextElement = document.querySelector(
    "[data-operand-current]"
);

const previousScreenTextElement = document.querySelector(
    "[data-operand-previous]"
);

//initialize class
class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    //clear inputs
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    //delete current input
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //add number to current input
    appendNumber(number) {
        //check for decimal point
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //add operator and initialize next input
    flushOperator(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    //calculate
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = previous + current;
                break;

            case "-":
                computation = previous - current;
                break;

            case "×":
                computation = previous * current;
                break;

            case "÷":
                computation = previous / current;
                break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    //update screen
    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }

    }
}
//initialize new calculator
const calculator = new Calculator(currentScreenTextElement, previousScreenTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.flushOperator(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});