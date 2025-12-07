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
        inputArray[i] = inputArray[i].split('')
      }
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()
  let result = 0

  const stack = []

  // add first point below S
  stack.push([1, inputArray[0].findIndex(elem => elem === 'S')])

  while (stack.length > 0) {
    const [cur_row, cur_col] = stack.pop()
    
    // invalid point
    if (cur_row === inputArray.length || cur_col < 0 || cur_col === inputArray[0].length) {
      continue
    }

    const cur = inputArray[cur_row][cur_col]

    // continue to next row
    // mark visited with '|'
    if (cur === '.') {
      inputArray[cur_row][cur_col] = '|'
      stack.push([cur_row + 1, cur_col])
    }

    // split
    if (cur === '^') {
      stack.push([cur_row, cur_col - 1], [cur_row, cur_col + 1])
      result++
    }
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})