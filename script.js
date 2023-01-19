const opButtons = document.querySelectorAll('.op');
const delButton = document.querySelector('#del');
const eqButton = document.querySelector('#eq');
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

function doOperation(putToOut) {
    const parts = input.textContent.split(' ');
    parts[0] = Number(parts[0]);
    parts[2] = Number(parts[2]);
    let ret = '';
    switch (parts[1]) {
        case '+':
            ret = add(parts[0], parts[2]);
            break;
        case '-':
            ret = subtract(parts[0], parts[2]);
            break;
        case '÷':
            ret = divide(parts[0], parts[2]);
            break;
        case '×':
            ret = multiply(parts[0], parts[2]);
            break;
    }
    if (putToOut) {
        output.textContent = ret;
    }
    else {
        input.textContent = ret;
        output.textContent = '';
    }
}

symButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (output.textContent !== '') {
            input.textContent = output.textContent;
            output.textContent = '';
        }
        else if (input.textContent === '|') {
            return;
        }
        if (input.textContent.split(' ').length === 3) {
            doOperation(false);
        }
        switch (e.target.id) {
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
        }
    });
});

delButton.addEventListener('click', e => {
    if (input.textContent === '|') {
        return;
    }
    let amount = 1;
    if (input.textContent.charAt(input.textContent.length - 1) === ' ') {
        amount = 3;
    }
    input.textContent = input.textContent.substring(0, input.textContent.length - amount);
    if (input.textContent.length === 0) {
        input.textContent = '|';
    }
});

eqButton.addEventListener('click', e => {
    if (input.textContent.split(' ').length === 3) {
        doOperation(true);
    }
    else if (!input.textContent.includes(' ') && input.textContent !== '|') {
        output.textContent = input.textContent;
    }
});

numButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (input.textContent === '|' || output.textContent !== '') {
            input.textContent = '';
            output.textContent = '';
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
                const parts = input.textContent.split(' ');
                if (input.textContent.includes(' ')) {
                    if (parts[2].includes('.')) {
                        break;
                    }
                }
                else if (parts[0].includes('.')) {
                    break;
                }
                append = '.'
                break;
        }
        input.textContent += append;
    });
});