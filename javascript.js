const display = document.querySelector("#display");
let currentValue = "0";
let previousValue = null;
let operator = null;
let waitingForNumber = false;

function updateDisplay() { display.textContent = currentValue.replace(".", ","); }
function inputNumber(number) { if (waitingForNumber) { currentValue = number; waitingForNumber = false; } else currentValue = currentValue === "0" ? number : currentValue + number; }
function calculate(first, second, selectedOperator) {
    if (selectedOperator === "+") return first + second;
    if (selectedOperator === "-") return first - second;
    if (selectedOperator === "*") return first * second;
    if (selectedOperator === "/") return second === 0 ? null : first / second;
    if (selectedOperator === "%") return first % second;
    return second;
}
function chooseOperator(nextOperator) {
    const inputValue = Number(currentValue);
    if (operator && !waitingForNumber) {
        const result = calculate(previousValue, inputValue, operator);
        if (result === null) { currentValue = "Fel"; previousValue = null; operator = null; waitingForNumber = true; return; }
        currentValue = String(result); previousValue = result;
    } else previousValue = inputValue;
    operator = nextOperator; waitingForNumber = true;
}
function performCalculation() { if (!operator || waitingForNumber) return; const result = calculate(previousValue, Number(currentValue), operator); currentValue = result === null ? "Fel" : String(result); previousValue = null; operator = null; waitingForNumber = true; }
function clearCalculator() { currentValue = "0"; previousValue = null; operator = null; waitingForNumber = false; }
function handleButton(button) {
    if (button.dataset.number !== undefined) inputNumber(button.dataset.number);
    if (button.dataset.operator) chooseOperator(button.dataset.operator);
    if (button.dataset.action === "clear") clearCalculator();
    if (button.dataset.action === "delete" && !waitingForNumber && currentValue !== "Fel") currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
    if (button.dataset.action === "decimal") { if (waitingForNumber) { currentValue = "0."; waitingForNumber = false; } else if (!currentValue.includes(".")) currentValue += "."; }
    if (button.dataset.action === "calculate") performCalculation();
    updateDisplay();
}
document.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => handleButton(button)));
document.addEventListener("keydown", (event) => { const key = event.key === "," ? "." : event.key; if (/^\d$/.test(key)) handleButton({ dataset: { number: key } }); else if (["+", "-", "*", "/", "%"].includes(key)) handleButton({ dataset: { operator: key } }); else if (key === ".") handleButton({ dataset: { action: "decimal" } }); else if (key === "Enter" || key === "=") handleButton({ dataset: { action: "calculate" } }); else if (key === "Escape") handleButton({ dataset: { action: "clear" } }); else if (key === "Backspace") handleButton({ dataset: { action: "delete" } }); });
updateDisplay();
