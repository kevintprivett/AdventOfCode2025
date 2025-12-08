const fileInput = document.getElementById('problem_input')
const solveButton = document.getElementById('solveButton')
const resultText = document.getElementById('result')
const timeText = document.getElementById('time')
const radioButtons = document.querySelectorAll('input[name="input_size"]')

let inputArray = []
let maxConnect = 10

radioButtons.forEach(radio => {
  radio.addEventListener('change', (event) => {
    maxConnect = parseInt(event.target.value)
  })
})

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
    }

    reader.readAsText(file)
  }
})

solveButton.addEventListener('click', () => {
  const startTime = Date.now()

  // helper: 3D euclidean distance
  const euclideanDistance = (a, b) => {
    const [ax, ay, az] = a
    const [bx, by, bz] = b

    return Math.sqrt(
      (ax - bx) ** 2 +
      (ay - by) ** 2 +
      (az - bz) ** 2
    )
  }

  // generate list of paths and distances
  const allPaths = []

  for (let i = 0; i < inputArray.length - 1; i++) {
    for (let j = i + 1; j < inputArray.length; j++) {
      allPaths.push(
        {
          'path': `${inputArray[i].join(',')}-${inputArray[j].join(',')}`,
          'distance': euclideanDistance(inputArray[i], inputArray[j])
        }
      )
    }
  }

  // sort by distance (would be faster with fixed length heap, but js things)
  allPaths.sort((a, b) => a.distance - b.distance)

  // union-find
  const unionFind = {}

  for (let i = 0; i < inputArray.length; i++) {
    const node = `${inputArray[i].join(',')}`
    unionFind[node] = {
      parent: node,
      rank: 1
    }
  }

  for (let i = 0; i < maxConnect; i++) {
    const curPath = allPaths[i].path

    const [nodeAName, nodeBName] = curPath.split('-')

    const nodeA = unionFind[nodeAName]
    const nodeB = unionFind[nodeBName]

    let parentA = nodeA
    let parentAName = nodeAName
    while (parentA.parent !== parentAName) {
      parentAName = parentA.parent
      parentA = unionFind[parentAName]
    }

    let parentB = nodeB
    let parentBName = nodeBName
    while (parentB.parent !== parentBName) {
      parentBName = parentB.parent
      parentB = unionFind[parentBName]
    }

    if (parentAName === parentBName) {
      continue
    }

    let newParent = parentA
    let newChild = parentB

    if (parentB.rank > parentA.rank) {
      newParent = parentB
      newChild = parentA
    }

    newParent.rank = parentA.rank + parentB.rank
    newChild.rank = 0

    newChild.parent = newParent.parent
  }

  // another time a heap would be nice...
  const topThree = [-3, -2, -1]

  topThree.sort((a, b) => a - b)

  Object.values(unionFind).forEach(node => {
    if (node.rank > topThree[0]) {
      topThree[0] = node.rank
      topThree.sort((a, b) => a - b)
    }
  })

  const result = topThree.reduce((a, b) => a * b, 1)

  resultText.hidden = false;
  resultText.innerText = `Result: ${result}`
  timeText.hidden = false;
  timeText.innerText = `Time(ms): ${Date.now() - startTime}`
})