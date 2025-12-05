const fileInput = document.getElementById('problem_input')
const solveButton = document.getElementById('solveButton')
const resultText = document.getElementById('result')
const timeText = document.getElementById('time')

let ranges = []
let queries = []

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const fileContent = e.target.result
      const inputArray = fileContent.trim().split('\n')

      const splitIndex = inputArray.findIndex(elem => elem === '')

      ranges = inputArray.slice(0, splitIndex)
      queries = inputArray.slice(splitIndex + 1)

      for (let i = 0; i < ranges.length; i++) {
        ranges[i] = ranges[i].split('-')
        ranges[i][0] = parseInt(ranges[i][0])
        ranges[i][1] = parseInt(ranges[i][1])
      }

      for (let i = 0; i < queries.length; i++) {
        queries[i] = parseInt(queries[i])
      }
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()
  let result = 0

  ranges.sort((a,b) => a[0] - b[0])

  const mergedRanges = []

  let curRange = ranges[0]

  for (let i = 1; i < ranges.length; i++) {
    // overlap
    if (curRange[1] >= ranges[i][0]) {
      // merge range to be the best possible end
      curRange[1] = Math.max(curRange[1], ranges[i][1])
    } else {
      // no overlap
      mergedRanges.push(curRange)
      curRange = ranges[i]
    }
  }

  mergedRanges.push(curRange)

  for (const range of mergedRanges) {
    result += range[1] - range[0] + 1
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})