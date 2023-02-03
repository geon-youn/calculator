const opButtons = document.querySelectorAll(".op");
const delButton = document.querySelector("#del");
const eqButton = document.querySelector("#eq");
const symButtons = document.querySelectorAll(".sym");
const numButtons = document.querySelectorAll(".num");
const input = document.querySelector("#calc-input");

setInterval(() => {
    if (input.textContent === "|") {
        input.style.opacity = input.style.opacity === "0" ? "1" : "0";
    } else {
        input.style.opacity = 1;
    }
}, 750);

const output = document.querySelector("#calc-output");
const body = document.querySelector("body");

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
    if (b === 0) {
        console.error("The fuck man?");
        return 0;
    }
    return a / b;
}

function operate(f, a, b) {
    return f(a, b);
}

function doOperation(putToOut) {
    const parts = input.textContent.split(" ");
    parts[0] = Number(parts[0]);
    parts[2] = Number(parts[2]);
    let ret = "";
    switch (parts[1]) {
        case "+":
            ret = add(parts[0], parts[2]);
            break;
        case "-":
            ret = subtract(parts[0], parts[2]);
            break;
        case "÷":
            ret = divide(parts[0], parts[2]);
            break;
        case "×":
            ret = multiply(parts[0], parts[2]);
            break;
    }
    ret = String(ret).length > 10 ? ret.toExponential(2) : ret;
    if (putToOut) {
        output.textContent = ret;
    } else {
        input.textContent = ret;
        output.textContent = "";
    }
}

function handleSyms(id) {
    if (
        !["div", "mul", "sub", "add", "/", "*", "-", "+", "x", "X"].includes(id)
    ) {
        return;
    }
    if (
        output.textContent !== "" &&
        (input.textContent.includes(" ") || input.textContent === "|")
    ) {
        input.style.opacity = 1;
        input.textContent = output.textContent;
        output.textContent = "";
    } else if (input.textContent === "|") {
        return;
    }
    if (input.textContent.split(" ").length === 3) {
        doOperation(false);
    }
    switch (id) {
        case "/":
        case "div":
            input.textContent += " ÷ ";
            break;
        case "x":
        case "X":
        case "*":
        case "mul":
            input.textContent += " × ";
            break;
        case "-":
        case "sub":
            input.textContent += " - ";
            break;
        case "+":
        case "add":
            input.textContent += " + ";
            break;
    }
}

symButtons.forEach((button) => {
    button.addEventListener("click", (e) => handleSyms(e.target.id));
});

function handleDel(id) {
    if (!["Backspace", "Delete", "NumLock", "del"].includes(id)) {
        return;
    }
    if (input.textContent === "|") {
        return;
    }
    let amount = 1;
    if (input.textContent.charAt(input.textContent.length - 1) === " ") {
        amount = 3;
    }
    input.textContent = input.textContent.substring(
        0,
        input.textContent.length - amount
    );
    if (input.textContent.length === 0) {
        input.textContent = "|";
    }
}

delButton.addEventListener("click", (e) => handleDel(e.target.id));

function handleEq(id) {
    if (!["=", "eq", "Enter"].includes(id)) {
        return;
    }
    if (input.textContent.split(" ").length === 3) {
        doOperation(true);
    } else if (!input.textContent.includes(" ") && input.textContent !== "|") {
        output.textContent = input.textContent;
    }
}

eqButton.addEventListener("click", (e) => handleEq(e.target.id));

function handleNum(id) {
    let append = "";
    switch (id) {
        case "0":
        case "zero":
            append = "0";
            break;
        case "1":
        case "one":
            append = "1";
            break;
        case "2":
        case "two":
            append = "2";
            break;
        case "3":
        case "three":
            append = "3";
            break;
        case "4":
        case "four":
            append = "4";
            break;
        case "5":
        case "five":
            append = "5";
            break;
        case "6":
        case "six":
            append = "6";
            break;
        case "7":
        case "seven":
            append = "7";
            break;
        case "8":
        case "eight":
            append = "8";
            break;
        case "9":
        case "nine":
            append = "9";
            break;
        case ".":
        case "dot":
            const parts = input.textContent.split(" ");
            if (input.textContent.includes(" ")) {
                if (parts[2].includes(".")) {
                    break;
                }
            } else if (parts[0].includes(".")) {
                break;
            }
            append = ".";
            break;
        default:
            return;
    }
    input.style.opacity = 1;
    if (input.textContent === "|") {
        input.textContent = "";
    }
    if (input.textContent === "|" && output.textContent !== "") {
        input.textContent = "";
        output.textContent = "";
    }
    input.textContent += append;
}

numButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleNum(e.target.id);
    });
});

body.addEventListener("keydown", (e) => {
    handleSyms(e.key);
    handleDel(e.key);
    handleEq(e.key);
    handleNum(e.key);
});
