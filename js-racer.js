"use strict"

let player = 3
let track = 15
function diceRoll () {
  return Math.floor((Math.random()) * 6)
}
let totalPlayer = []
function generatePlayer(){
  let obj = {}
    let char = 'abcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < player; i++){
        obj['name'] = char[i]
        obj['position'] = 0
        totalPlayer.push(obj)
        obj = {}
    }
}
generatePlayer()

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}



function printBoard () {
    let arr = []
    for (let i = 0; i < totalPlayer.length; i++){
      let dadu = diceRoll()
      totalPlayer[i].position+=dadu
      arr.push(printLine(totalPlayer[i].name,totalPlayer[i].position))
    }
  return arr
}





// sleep(500)
// clearScreen()

function printLine (player, pos) {
  // console.log(player,pos)
  let arr = []
  for (let i = 0; i < track; i++){
      if (i === pos){
        arr.push(player)
      } else {
        arr.push(' ')
      }
  }
  return arr.join('|')
}


function advance (player) {
   var newPos = player += diceRoll()
  return newPos
}



function finished () {
  for (let i = 0; i < totalPlayer.length; i ++){
    if (totalPlayer[i].position===track){
      return winner()
    }
  }
  console.log(printBoard())
}

finished()


function winner () {
}


function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
