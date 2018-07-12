"use strict"
const argv = process.argv.slice(2)
const totPlayers = +argv[0]
const track = +argv[1]

if(totPlayers >= 2 && track >= 15) {
  function diceRoll () {
    return Math.floor(Math.random() * (6 - 1 + 1));
  }
  
  function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  function players(num) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let containPlayerArr = []
    for(let i = 0; i < num; i++) {
      let playerObj = {}
      playerObj.name = alphabet[i]
      playerObj.pos = 0
      containPlayerArr.push(playerObj)
    }
    return containPlayerArr
  }

  let randomSupper = Math.floor(Math.random() * (track - 7 + 1));
  let randomObstacle = Math.floor(Math.random() * (track - 7 + 1))
  function printLine (player,pos) {
    let trackArr = []
    let space = ' '
    for(let i = 0; i < track; i++) {
      if (i === pos) {
        trackArr.push(player)
      } else if(i === randomSupper){
        trackArr.push('$')
      } else if (i === randomObstacle){
        trackArr.push('@')
      } else {
        trackArr.push(space)
      }
    }
    return trackArr.join('|')
  }

  // console.log(players(3));
  // console.log(printLine(players(totPlayers)[0].name, 0)); 
  
  // players(totPlayers) value is arr of obj
  // printLine(name, pos)
  let player = players(totPlayers)
  function printBoard () {
    for(let i = 0; i < player.length; i++) {
      // console.log('this Pos: ', player[0].pos += diceRoll());
      console.log(printLine(player[i].name, player[i].pos));
    }
    sleep(1000)
    clearScreen()
    return ``
  }
  
  function advance () {
    let start = true
    while (start) {
      for(let i = 0; i < player.length; i++) {
        player[i].pos += diceRoll()
        console.log(printLine(player[i].name, player[i].pos));
        if(player[i].pos === track|| player[i].pos > track) {
          start = false
          return `The winner Is ${player[i].name}`
        } else if (player[i].pos === randomSupper) {
          console.log(`GASSSS 5 LAGKAH player ${player[i].name} LUUUUR`);
          player[i].pos += 5
        } else if (player[i].pos === randomObstacle) {
          console.log(`SAYANG SEKALI LUUUUR player ${player[i].name} MUNDUR 2 LANGKAH`);
          player[i].pos -= 2
        }
      }
      sleep(1000)
      clearScreen()
    }
    return ''
  }
  
  function finished () {
    return printBoard() + advance()
  }
  
  
  function winner (name) {
    return `the Winner is ${name}`
  }
  console.log(finished());
  // console.log();
  
  function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
} else if (`${totPlayers}` === 'NaN') {
  console.log(`node js-racer.js <input_players_min_2> <input_track_min_15>`);
} else {
  console.log(`your input players or track is invalid`);
}