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
  queries.sort((a,b) => a - b)

  let rangesIdx = 0
  let queriesIdx = 0

  while (rangesIdx < ranges.length && queriesIdx < queries.length) {
    const range = ranges[rangesIdx]
    const query = queries[queriesIdx]

    // fail: query too small, move to next
    if (query < range[0]) {
      queriesIdx++
      continue
    }
    
    // fail: no queries in range, move to next
    if (query > range[1]) {
      rangesIdx++
      continue
    }

    // success, add to result and move to next query
    result++
    queriesIdx++
  }

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})