let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const btns = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

updateDisplay();

function clickButton() {
    for(let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function() {
                if(btns[i].classList.contains('operand')) {
                    inputOperand(btns[i].value);
                    updateDisplay();
                } else if(btns[i].classList.contains('operator')) {
                    inputOperator(btns[i].value);
                } else if(btns[i].classList.contains('equals')) {
                    inputEquals();
                    updateDisplay();
                } else if(btns[i].classList.contains('decimal')) {
                    inputDecimal(btns[i].value);
                    updateDisplay();
                } else if(btns[i].classList.contains('percent')) {
                    inputPercent(displayValue);
                    updateDisplay();
                } else if(btns[i].classList.contains('sign')) {
                    inputSign(displayValue);
                    updateDisplay();
                } else if(btns[i].classList.contains('clear'))
                    clearDisplay();
                    updateDisplay();
            }
        )}
}

clickButton();

function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) { // calls operate if user enters two operators
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        displayValue = round(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) { // resets operator placement after third operator
        secondOperand = displayValue;
        result = operate(secondOperator, Number(firstOperand), Number(secondOperand));
        secondOperator = operator;
        displayValue = round(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if(firstOperator === null) { // does nothing if an operator hasn't been selected
        displayValue = displayValue;
    } else if(secondOperator != null) { // calls operate to perform calculations on the first operand twice with the selected operator
        secondOperand = displayValue;
        result = operate(secondOperator, Number(firstOperand), Number(secondOperand));
        validateResult(result);
    } else { // calls operate to perform calculations
        secondOperand = displayValue;
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        validateResult(result);
    }
}
// adds a decimal on keypress if one isn't already present
function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function operate(operand, num1, num2) {
    if(operand === '+') {
        return num1 + num2;
    } else if(operand === '-') {
        return num1 - num2;
    } else if(operand === '*') {
        return num1 * num2;
    } else if(operand === '/') {
        if(num2 === 0) {
            return 'Invalid';
        } else {
            return num1 / num2;
        }
    }
}

function round(num, places) {
    return parseFloat(`${Math.round(`${num}e${places}`)}e-${places}`);
}
// displays "Invalid" if users attempts to divide by 0, works normally otherwise
function validateResult(result) {
    if(result === 'Invalid') {
        displayValue = 'Invalid';
    } else {
        displayValue = round(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}