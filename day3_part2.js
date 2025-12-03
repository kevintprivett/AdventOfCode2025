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
      inputArray.pop()
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  let result = 0

  for (const bank of inputArray) {
    const subResult = bank.slice(-12).split('')

    for (let i = 0; i < subResult.length; i++) {
      subResult[i] = parseInt(subResult[i])
    }

    // iterate backwards, except last twelve
    for (let i = bank.length - 13; i >= 0; i--) {
      let cur = parseInt(bank[i])
      
      for (let j = 0; j < subResult.length; j++) {
        if (cur >= subResult[j]) {
          const temp = subResult[j]
          subResult[j] = cur
          cur = temp
        } else {
          break
        }
      }
    }

    let subResultSum = 0

    for (let i = 0; i < subResult.length; i++) {
      subResultSum *= 10
      subResultSum += subResult[i]
    }

    result += subResultSum
  }

  resultText.hidden = false;
  resultText.innerText += ` ${result}`
})
