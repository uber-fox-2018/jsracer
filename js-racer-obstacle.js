"use strict"

const argv = process.argv
const jumlahPlayer = argv[2]
const panjangTrack = argv[3]

if (jumlahPlayer >= 2 && panjangTrack >= 15) {
  const boardGame = printBoard()
  console.log(boardGame)
} else {
  console.log('Panjang track atau jumlah pemain tidak valid')
}

function diceRoll () {
  return Math.floor(Math.random() * panjangTrack)-1
}

function generatePlayers () {
  const players = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  var playerArr = []
  for (let i = 0; i < jumlahPlayer; i++) {
    var playerObj = {}
    playerObj['name'] = players[i]
    playerObj['position'] = 0
    playerArr.push(playerObj)
  }
  return playerArr
}

function superPower() {
  return Math.floor(Math.random() * panjangTrack)-1
}

function trappeds () {
  return Math.floor(Math.random() * panjangTrack)-1
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  const player = generatePlayers()
  let winner = ''
  let powerUp = superPower()
  let trapped = trappeds()

  while (winner === '') {
    let board = []
    for (let key in player) {
      if (player[key].position === 0) {
        let trackLine = printLine(player[key].name, player[key].position, powerUp, trapped)
        player[key].position = advance(player[key], powerUp, trapped)
        board.push(trackLine)
      } else {
        let lemparDadu = diceRoll()
        if (winner === '') {
          if (player[key].position + lemparDadu >= panjangTrack-1) {
            player[key].position = panjangTrack-1
            winner = player[key].name
          } else {
            player[key].position = lemparDadu
          }
        }
        let mainBoard = printLine(player[key].name, player[key].position, powerUp, trapped)
        board.push(mainBoard)
      }
    }
    console.log(board);
    sleep(1000);
    clearScreen();
  }
  return winners(winner)
}

function printLine (player, position, powerUp, trap) {
  let board = []

  for (let i = 0; i < panjangTrack; i++) {
    if (i === position) {
      board.push(player)
    } else if (i === powerUp) {
      board.push('$')
    } else if (i === trap) {
      board.push('#')
    } else if (i === panjangTrack-1) {
      board.push('Finish')
    } else {
      board.push(' ')
    }
  }
  return board.join('|')
}

function advance (player, powerUp, trap) {
  player.position += diceRoll()
  if (player.position === powerUp) {
    player.position += 2
    console.log(`Power up 2+`)
  } else if (player.position === trap) {
    player.position -= 2
    console.log(`Wooosh, trapped`);
  }
  return player.position
}

function finished () {

}

function winners (winner) {
  return `============== The Winner is ${winner} ==============`
}

function clearScreen () {
  console.clear();
}