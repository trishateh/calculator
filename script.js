let previousOperand = '';
let currentOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator');
const clearButton = document.querySelector('[data-clear');
const deleteButton = document.querySelector('[data-delete]');
const decimalButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperationScreen = document.querySelector('[data-previous-operation]');
const currentOperationScreen = document.querySelector('[data-current-operation]');

window.addEventListener('keydown', handleKeyboardInput);

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', deleteNumber);

equalsButton.addEventListener('click', compute);

numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)));

operatorButtons.forEach((button) => button.addEventListener('click', () => setOperation(button.textContent)));

decimalButton.addEventListener('click', appendDecimal);

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    previousOperationScreen.textContent = '';
    previousOperand = '';
    currentOperand = '';
    currentOperation = null;
}

function appendDecimal() {
    if (shouldResetScreen) {
        resetScreen()
    }
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNumber() {
   currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) compute();
    previousOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    previousOperationScreen.textContent = `${previousOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function compute() {
   if (currentOperation === null || shouldResetScreen) return;
   if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
       return "ERROR";
   }
   currentOperand = currentOperationScreen.textContent;
   currentOperationScreen.textContent = roundResult(operate(currentOperation, previousOperand, currentOperand))

   previousOperationScreen.textContent = `${previousOperand} ${currentOperation} ${currentOperand} =`;
   currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '÷') setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}

function add(x, y) {
    return (x + y);
}

function subtract(x, y) {
    return (x - y);
}

function multiply(x, y) {
    return (x * y);
}

function divide(x, y) {
    return (x / y);
}

function operate(operator, x, y) {
    x = Number(x);
    y = Number(y);
    switch(operator) {
        case '+' :
            return add(x, y);
        case '-' :
            return subtract(x, y);
        case 'x' :
            return multiply(x, y);
        case '÷' :
            if (y === 0) return null
            else return divide(x, y);
        default:
            return null;
    }
}

