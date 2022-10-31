function operate(op, num1, num2) {
    if (op === '+') {
        add(num1, num2);
    }
    else if (op === '-') {
        subtract(num1, num2);
    }
    else if (op === '*') {
        multiply(num1, num2);
    }
    else if (op === '/') {
        divide(num1, num2);
    }
    else return 'invalid';
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'You cannot divide by zero.';
    }
    else {
        return num1 / num2;
    }
}