const opButtons = document.querySelectorAll('.op');
const symButtons = document.querySelectorAll('.sym');
const numButtons = document.querySelectorAll('.num');
const input = document.querySelector('#calc-input');
const output = document.querySelector('#calc-output');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(f, a, b) {
    return f(a, b);
}

function disableSyms() {
    symButtons.forEach(button => {
        button.setAttribute('disabled', '');
    });
}

function enableSyms() {
    symButtons.forEach(button => {
        button.removeAttribute('disabled');
    });
}

opButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (input.textContent === '|') {
            return;
        }
        switch (e.target.id) {
            case 'del':
                let amount = 1;
                if (input.textContent.charAt(input.textContent.length - 1) === ' ') {
                    amount = 3;
                    enableSyms();
                }
                input.textContent = input.textContent.substring(0, input.textContent.length - amount);
                if (input.textContent.length === 0) {
                    input.textContent = '|';
                }
                break;
            case 'div':
                input.textContent += ' ÷ ';
                break;
            case 'mul':
                input.textContent += ' × ';
                break;
            case 'sub':
                input.textContent += ' - ';
                break;
            case 'add':
                input.textContent += ' + ';
                break;
            case 'eq':
                break;
        }
    });
});

numButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (input.textContent === '|') {
            input.textContent = '';
        }
        let append = '';
        switch (e.target.id) {
            case 'zero':
                append = '0';
                break;
            case 'one':
                append = '1';
                break;
            case 'two':
                append = '2';
                break;
            case 'three':
                append = '3';
                break;
            case 'four':
                append = '4';
                break;
            case 'five':
                append = '5';
                break;
            case 'six':
                append = '6';
                break;
            case 'seven':
                append = '7';
                break;
            case 'eight':
                append = '8';
                break;
            case 'nine':
                append = '9';
                break;
            case 'dot':
                append = '.'
                e.target.setAttribute('disabled', '');
                break;
        }
        input.textContent += append;
    });
});