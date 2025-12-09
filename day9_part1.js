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
        inputArray[i] = inputArray[i].split(',')

        for (let j = 0; j < inputArray[i].length; j++) {
          inputArray[i][j] = parseInt(inputArray[i][j])
        }
      }

      console.log(inputArray)
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()

  // greedy doesn't seem to work :'(
  let result = 0

  for (let i = 0; i < inputArray.length - 1; i++) {
    for (let j = i; j < inputArray.length; j++) {
      result = Math.max(
        result,
        (Math.abs(inputArray[i][0] - inputArray[j][0]) + 1) *
        (Math.abs(inputArray[i][1] - inputArray[j][1]) + 1)
      )
    }
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})