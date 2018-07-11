"use strict"

const argv = process.argv
const jumlahPlayer = argv[2]
const panjangTrack = argv[3]

if (jumlahPlayer >= 2 && panjangTrack >= 15) {
  const board = printBoard()
  console.log(board)
} else {
  console.log('Jumlah player atau panjang track tidak valid!');
}

function diceRoll () {
  return Math.floor(Math.random() * 5) + 1
}

function generatePlayers () {
  const players = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  let playerObj = {}
  for (let i = 0; i < jumlahPlayer; i++) {
    playerObj[players[i]] = 0
  }
  return playerObj
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

  while (winner === '') {
    let board = []
    for (let key in player) {
      if (player[key] === 0) {
        let trackLine = printLine(key, player[key])
        player[key] += diceRoll()
        board.push(trackLine)
      } else {
        let lemparDaduPlayer = diceRoll(player[key])
        if (winner === '') {
          if (player[key] + lemparDaduPlayer >= panjangTrack-1) {
            player[key] = panjangTrack -1
            winner = key;
          } else {
            player[key] += lemparDaduPlayer
          }
        }
        let mainBoard = printLine(key, player[key])
        board.push(mainBoard)
      }
    }
    console.log(board);
    sleep();
    clearScreen();
  }
  return winners(winner)
}

function printLine (player, pos) {
  let board = []

  for (let i = 0; i < panjangTrack; i++) {
    if (i === pos) {
      board.push(player)
    } else {
      board.push(' ')
    }
  }
  return board.join('|')
}

function winners (winner) {
  return `============== The Winner is ${winner} ==============`
}

function clearScreen () {
  console.clear();
}
