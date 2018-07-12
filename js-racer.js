"use strict"
const argv = process.argv
const player = Number(argv[2])
const trackLength = Number(argv[3])

var playerArr = []

if (player < 2) {
  console.log('minimum player is 2')
}

if (trackLength < 15) {
  console.log('minimum length of the track is 15')
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function createPlayer(player) {
  let playerNames = ['Wahyu', 'Andre', 'Wisnu', 'Riza', 'Brian', 'Helmi', 'FajarTC']
  for (let i = 0; i < player; i++) {
    let playerObj = {
      name: playerNames[i],
      position: 0
    }
    playerArr.push(playerObj)
  }
  return playerArr
}

function dice() {
  return Math.trunc(Math.random() * 6)
}

function printBoard(trackLength) {
  let mainBoard = []
  for (let i = 0; i < playerArr.length; i++) {
    let miniBoard = []
    let godMode = Math.trunc(Math.random() * 6)
    if (playerArr[i].position === godMode) {
      playerArr[i].position += 5
      console.log(`${playerArr[i].name} is enter gode mode`)
    }
    for (let j = 0; j < trackLength; j++) {
      if (playerArr[i].position === j) {
        miniBoard.push(playerArr[i].name)
      } else if(j === godMode) {
        miniBoard.push('G')
      } else {
        miniBoard.push('')
      }
    }
    mainBoard.push(miniBoard)
  }
  for (let i = 0; i < mainBoard.length; i++) {
    console.log(mainBoard[i].join('  |  '))
  }
}

function advance(player) {
  return player.position += dice()
}

function finished() {
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].position >= trackLength-1) {
      return true
    }
  }
  return false
}

function winner() {
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].position === trackLength-1) {
      return `${playerArr[i].name} is the winner`
    }
  }
}

function readyPlayerOne() {
  let indexPlayer = 0
  createPlayer(player)
  while(finished() === false) {
    printBoard(trackLength)
    advance(playerArr[indexPlayer])
    sleep(500)
    clearScreen()
    indexPlayer++
    if(indexPlayer === player) {
      indexPlayer = 0
    }
  }
  printBoard(trackLength)
  console.log(winner())
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

readyPlayerOne()
