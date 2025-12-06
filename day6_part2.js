const fileInput = document.getElementById('problem_input')
const solveButton = document.getElementById('solveButton')
const resultText = document.getElementById('result')
const timeText = document.getElementById('time')

let inputArray = []

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const fileContent = e.target.result
      inputArray = fileContent.split('\n')
      inputArray.pop()
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()
  let result = 0

  let subResult = 0
  let add = true
  // outer loop goes right, inner loop goes down
  for (let i = 0; i < inputArray[0].length; i++) {
    if (inputArray.at(-1)[i] !== ' ') {
      result += subResult
      if (inputArray.at(-1)[i] === '+') {
        subResult = 0
        add = true
      } else {
        subResult = 1
        add = false
      }
    }

    let operand = 0

    // build operand
    for (let j = 0; j < inputArray.length - 1; j++) {
      if (inputArray[j][i] === ' ') {
        continue
      }

      operand = operand * 10 + parseInt(inputArray[j][i])
    }

    if (operand === 0) {
      continue
    }

    if (add) {
      subResult += operand
    } else {
      subResult *= operand
    }
  }

  result += subResult

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})