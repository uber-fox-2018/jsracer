"use strict"

const argv = process.argv
const init = argv.slice(2)
const totalPlayer = init[0]
const maxLength = init[1]
let playerData ;

function sleep (milliseconds) { //create delay print
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function randomNum() { // generate step
  let num = Math.round(Math.random()*(6-1)+1)
  return num
}

function playerCreator() { // create player
  const alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res = []

  for (let i = 0; i < totalPlayer;i++) {
    let subRes = []
    subRes.push(alphabeth[i])
    subRes.push(0)
    res.push(subRes)
  }
  return playerData = res 
}

playerCreator()

function createTrack() {
  let res = []

  for (let i = 0; i < maxLength;i++) {
    res.push('| ')
  }
  return res
}

function printScreen() {
  
  if (totalPlayer < 2 || typeof(totalPlayer) === 'undefined') {
    return wrongInput()  
  } else if (maxLength < 20 || typeof(maxLength) === 'undefined') {
    return wrongInput() 
  } else if (typeof(init[2]) !== 'undefined') {
    return wrongInput()
  }

  let counter = 0
  for (let x = 0; x < 1;) {
    let trigger = false

    let updateTrack = ''
    let winner = ''

    for (let i = 0; i < totalPlayer; i++) {
      
      let playerName = playerData[i][0]
      let playerPos = playerData[i][1]
      let track = createTrack()
      let turn = 0

        for (let j = 0; j < track.length; j++) {
          if ( playerPos >= track.length-1) {
            trigger = true
            track[track.length-1] = '|' + playerName
            winner = playerName
          }
          if (playerPos === j) {
            
              track[j] = '|' + playerName
              track[j-2] = '|='
              track[j-3] = '|-'
          }
        }
      updateTrack += track.join('') + '\n'
    }

    stepAcumulator(counter)
    counter++
    if (counter == totalPlayer) {
      counter = 0
    }    

    console.log(updateTrack)
    // console.log(playerData) 
    sleep(500)
    console.clear()

    if (trigger) {
      console.log(finish(updateTrack,winner))
      sleep(500)
      return ""
    }
  }
}
console.log(printScreen())

function stepAcumulator(num) {
  return playerData[num][1] += randomNum()
}

function finish(strTrack,string) {
  // let res = strTrack +'\n'+ 'The Winner is '+ string
  return strTrack +'\n'+ 'The Winner is '+ string
}

function wrongInput() {
  let res = "\n   FORMAT INPUT :\n   node js-racer.js (Total player) (total length Track race)\n\n   REQUIREMENT INPUT :\n   -Minimum total player is 2\n   -Minimum track length is 15\n   "
  console.clear()
  return res
}