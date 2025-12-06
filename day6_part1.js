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
      inputArray = fileContent.trim().split('\n')

      for (let i = 0; i < inputArray.length; i++) {
        inputArray[i] = inputArray[i].split(/\s+/)

        for (let j = 0; j < inputArray[i].length; j++) {
          if (i === inputArray.length - 1) {
            break
          }
          inputArray[i][j] = parseInt(inputArray[i][j])
        }
      }
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()
  let result = 0

  // outer loop goes right, inner loop goes down
  for (let i = 0; i < inputArray[0].length; i++) {
    let subResult
    const add = inputArray.at(-1)[i] === '+'
    if (add) {
      subResult = 0
    } else {
      subResult = 1
    }

    for (let j = 0; j < inputArray.length - 1; j++) {
      if (add) {
        subResult += inputArray[j][i]
      } else {
        subResult *= inputArray[j][i]
      }
    }

    result += subResult
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})