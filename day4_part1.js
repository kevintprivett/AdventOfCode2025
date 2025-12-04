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
      inputArray = fileContent.trim().split('\n')
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  let result = 0

  const NEIGHBORS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]

  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] !== '.') {
        let neighborCount = 0

        for (const [di, dj] of NEIGHBORS) {
          // js stuff...
          const neighbor = inputArray?.[i+di]?.[j+dj]

          if (neighbor !== undefined && neighbor === '@') {
            neighborCount++
          }
        }

        if (neighborCount < 4) {
          result++
        }
      }
    }
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
})