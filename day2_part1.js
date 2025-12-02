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
      inputArray = fileContent.trim().split(',')

      for (let i = 0; i < inputArray.length; ++i) {
        inputArray[i] = inputArray[i].split('-')
      }
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {

  let result = 0

  for (const range of inputArray) {
    const baseString = range[0]
    const base = parseInt(baseString)
    const bounds = parseInt(range[1]) + 1

    let trial
    
    if (baseString.length % 2 == 1) {
      trial = ("1" + "0".repeat(Math.floor(baseString.length / 2)))
    } else {
      trial = baseString.slice(0, Math.floor(baseString.length / 2))
    }

    let trialNumber = parseInt(trial.repeat(2))
    while (trialNumber < bounds) {
      if (trialNumber >= base) {
        result += trialNumber
      }
      trial = (parseInt(trial) + 1).toString()
      trialNumber = parseInt(trial.repeat(2))
    }
  }

  resultText.hidden = false;
  resultText.innerText += ` ${result}`
})
