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

      // console.log(inputArray.length)
    }

    reader.readAsText(file)
  }
})

// solveButton.addEventListener('click', () => {
//   const startTime = Date.now()
//   let result = 0

//   const memo = {}

//   const dfs = (cur_row, cur_col) => {
//     // invalid point
//     if (cur_row === inputArray.length || cur_col < 0 || cur_col === inputArray[0].length) {
//       return 1
//     }

//     const memo_key = `${cur_row}, ${cur_col}`

//     if (memo_key in memo) {
//       // console.log(`cache hit: ${memo_key}`)
//       return memo[memo_key]
//     }

//     const cur = inputArray[cur_row][cur_col]

//     // console.log(`row: ${cur_row}, col: ${cur_col}, cur: ${cur}`)

//     // continue to next row
//     if (cur === '.') {
//       return dfs(cur_row + 1, cur_col)
//     }

//     // split
//     if (cur === '^') {
//       const subresult = dfs(cur_row, cur_col - 1) + dfs(cur_row, cur_col + 1)

//       memo[memo_key] = subresult

//       // console.log(`split, memo_key: ${memo_key}, subresult: ${subresult}`)

//       return subresult
//     }
//   }

//   result += dfs(1, inputArray[0].findIndex(elem => elem === 'S'))

//   resultText.hidden = false;
//   resultText.innerText = `Result: ${result}`
//   timeText.hidden = false;
//   timeText.innerText = `Time(ms): ${Date.now() - startTime}`
// })

solveButton.addEventListener('click', () => {
  const startTime = Date.now()
  let result = 0

  const dp = new Array(inputArray.length).fill(new Array(inputArray[0].length).fill(0))
  dp.push(new Array(inputArray[0].length).fill(1))

  for (let i = inputArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < inputArray[0].length; j++) {
      const cur = inputArray[i][j]

      // look down only
      if (cur === '.') {
        dp[i][j] = dp[i+1][j]
      }

      // look left and right
      if (cur === '^') {
        const left = j - 1 >= 0 ? dp[i+1][j-1] : 0
        const right = j + 1 < inputArray[0].length ? dp[i+1][j+1] : 0

        dp[i][j] = left + right
      }

    }
  }

  result += dp[0][inputArray[0].findIndex(elem => elem === 'S')]

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})