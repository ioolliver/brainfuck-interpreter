var memory = [0,0,0,0,0,0,0,0];
const chars = ["+", "-", ">", "<", ".", ",", "[", "]"];

var executeIndex = 0;
var memoryIndex = 0;

var executionInterval = null;

/* MEMORY MANAGEMENT */

function updateMemoryDisplay() {

  const table_row = document.querySelector('#memory-row');

  let newHTML = "";

  for(let i = 0; i < memory.length; i++) {

    newHTML += `<td>
      <p>${memory[i]}</p>
      <span>${i}</span>
    </td>`;

  }

  table_row.innerHTML = newHTML;

}

function resetMemory() {

  memory = [0,0,0,0,0,0,0,0];

  memoryIndex = 0;

  updateMemoryDisplay();
  
}

function sumToMemory() {

  if(!memory[memoryIndex]) memory[memoryIndex] = 0;

  memory[memoryIndex]++;

  updateMemoryDisplay();

}

function subToMemory() {

  if(!memory[memoryIndex]) memory[memoryIndex] = 0;

  memory[memoryIndex]--;

  updateMemoryDisplay();

}

function updateMemoryCell(number) {
  memory[memoryIndex] += Number(number);

  updateMemoryDisplay();
}

/* OUTPUT MANAGEMENT */

function writeToOutput(text) {

  const output_span = document.querySelector('#output-span');

  output_span.innerHTML = text;

}

function addToOutput(text) {

  const output_span = document.querySelector('#output-span');

  writeToOutput(output_span.innerHTML + text);

}

function getAsciiChar(n) {
  return new TextDecoder().decode(Uint8Array.from([n]));
}

function restartExecution() {

  resetMemory();
  writeToOutput("");

  executeIndex = 0;

}

/* CODE AREA MANAGEMENT */

function clearCode(code) {

  let cleanCode = "";

  for(let char of code) {

    if(chars.includes(char)) cleanCode += char;

  }

  return cleanCode;

}

function getCode() {

  const textarea_code = document.querySelector('#code-editor textarea');

  return clearCode(textarea_code.value);
  
}

/* BUTTONS */

function stepCode(code) {

  if(!code) code = getCode();

  execute(code[executeIndex], code);

  executeIndex++;

}

function runCode(reset=true) {

  if(reset) restartExecution();

  const executionSpeed = document.querySelector('#control-pane input').value;

  clearInterval(executionInterval);

  const code = getCode();

  executionInterval = setInterval(() => { stepCode(code) }, 1000 / executionSpeed);

}

function pauseCode() {

  clearInterval(executionInterval);

  executionInterval = null;

}

function continueCode() {

  runCode(false);

}

/* INTERPRETER */

function execute(command, code) {

  switch(command) {

    case "+":
      sumCommand();
    break;
    case "-":
      subCommand();
    break;
    case ">":
      rightCommand();
    break;
    case "<":
      leftCommand();
    break;
    case ",":
      inputCommand();
    break;
    case ".":
      outputCommand();
    break;
    case "!":
      exclamationCommand();
    break;

  }

}

function sumCommand() {
  sumToMemory();
}

function subCommand() {
  subToMemory();
}

function rightCommand() {
  memoryIndex++;
}

function leftCommand() {
  memoryIndex--;
}

function inputCommand() {
  const input = prompt("Type just numbers");

  updateMemoryCell(input);
}

function outputCommand() {
  addToOutput(getAsciiChar(memory[memoryIndex]));
}

function exclamationCommand() {

  addToOutput(memory[memoryIndex]);

}