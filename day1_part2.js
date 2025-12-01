const fileInput = document.getElementById('problem_input')
const solveButton = document.getElementById('solveButton')
const resultText = document.getElementById('result')

let inputArray = []

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const fileContent = e.target.result
      inputArray = fileContent.split('\n')
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  cur = 50
  result = 0

  for (const step of inputArray) {
    if (step[0] == 'L') {
      const oldCur = cur
      cur -= parseInt(step.slice(1))
      result += Math.abs(Math.floor((cur - 1) / 100))
      if (oldCur === 0) {
        result -= 1
      }
      cur = ((cur % 100) + 100) % 100 // true mod
    } else if (step[0] == 'R') {
      cur = (cur + parseInt(step.slice(1)))
      result += Math.abs(Math.floor(cur / 100))
      cur = ((cur % 100) + 100) % 100 // true mod
    }
  }

  resultText.hidden = false;
  resultText.innerText += ` ${result}`
})
