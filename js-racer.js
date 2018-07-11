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

function createPlayer(player) {
  let playerName = ['Wahyu', 'Andre', 'Wisnu', 'Brian', 'Riza', 'Oq', 'Ari', 'Helmi', 'FajarTC']
  for (let i = 0; i < player; i++) {
    let playerObj = {
      name: playerName[i],
      position: 0
    }
    playerArr.push(playerObj)
  }
  return playerArr
}

function diceRoll() {
  return Math.trunc((Math.random() * 6)+1)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (trackLength) {
  let mainBoard = []

  // for (let i = 0; i < playerArr.length; i++) {
  //   if(playerArr[i].position >= trackLength-1) {
  //     playerArr[i].position = trackLength-1
  //   }
  // }

  for(let i = 0; i < playerArr.length; i++) {
    let temp = []
    for (let j = 0; j < trackLength; j++) {

      if(playerArr[i].position > trackLength) {
            playerArr[i].position = trackLength-1
          }

      if (playerArr[i].position == j) {
        temp.push(playerArr[i].name)
      } else {
        temp.push("")
      }
    }
    mainBoard.push(temp)
  }
  for (let i = 0; i < mainBoard.length; i++) {
    console.log(mainBoard[i].join(' | '))
  }
}

function advance (player) {
  return player.position += diceRoll()
}

function readyPlayerOne() {
  createPlayer(player)
  let index = 0
  while(finished() === false) {
    printBoard(trackLength)
    advance(playerArr[index])
    sleep(400)
    clearScreen()
    index++
    if(index == 3) {
      index = 0
    }
  }
  console.log(printBoard(trackLength));
  
  console.log(winner())
}

function finished (trackLength) {
  for(let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].position == trackLength) {
      return true
    } 
  }
  return false
} 

function winner () {
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].position >= trackLength-1) {
      return `${playerArr[i].name} is the winner`
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


readyPlayerOne()
// createPlayer(player)
// console.log(finished())
