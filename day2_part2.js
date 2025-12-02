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
    const invalidSet = new Set()

    const baseString = range[0].trim()
    const minLength = baseString.length
    const base = parseInt(baseString)

    const boundsString = range[1].trim()
    const maxLength = boundsString.length
    const bounds = parseInt(boundsString) + 1

    // handle period of 1 separately, to make implementation easier
    for (let repeats = minLength; repeats <= maxLength; repeats++) {
      if (repeats == 1) {
        continue
      }
      for (let trial = 1; trial < 10; trial++) {
        const trialNumber = parseInt(trial.toString().repeat(repeats))
        if (trialNumber >= base && trialNumber < bounds) {
          invalidSet.add(trialNumber)
        }
      }
    }

    // repeating every 1, 2, 3, ...
    for (let period = 2; period <= Math.floor(maxLength / 2); period++) {
      // number of repeating groups
      const repeats = Math.ceil(minLength / period)
      if (repeats * period == minLength) {
        let trial = baseString.slice(0, period) 
        let trialNumber = parseInt(trial.repeat(repeats)) 
        while (trialNumber < bounds) {
          if (trialNumber >= base) {
            invalidSet.add(trialNumber)
          }

          trial = (parseInt(trial) + 1).toString()
          trialNumber = parseInt(trial.repeat(repeats))
        }
      }

      if (repeats * period == maxLength && repeats * period != minLength) {
        let trial = "1" + "0".repeat(period - 1)
        let trialNumber = parseInt(trial.repeat(repeats)) 
        while (trialNumber < bounds) {
          if (trialNumber >= base) {
            invalidSet.add(trialNumber)
          }

          trial = (parseInt(trial) + 1).toString()
          trialNumber = parseInt(trial.repeat(repeats))
        }
      }
    }

    for (const invalid of [...invalidSet]) {
      result += invalid
    }
  }

  resultText.hidden = false;
  resultText.innerText += ` ${result}`
})
