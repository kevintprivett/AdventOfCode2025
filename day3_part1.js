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

      console.log(inputArray)
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  let result = 0

  for (const bank of inputArray) {
    let tensPlace = parseInt(bank.at(-2))
    let onesPlace = parseInt(bank.at(-1))

    // iterate backwards, except last two
    for (let i = bank.length - 3; i >= 0; i--) {
      let cur = parseInt(bank[i])
      if (cur >= tensPlace) {
        onesPlace = Math.max(onesPlace, tensPlace)
        tensPlace = cur
      }
    }

    result += tensPlace * 10 + onesPlace
  }

  resultText.hidden = false;
  resultText.innerText += ` ${result}`
})
