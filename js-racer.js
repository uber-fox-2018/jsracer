"use strict"
let argv = process.argv.slice(2)
var playerMax = Number(argv[0])
var trackLength = Number(argv[1])
var players = advance(playerMax)

// if(Number(argv[0]) >=2  && Number(argv[1]){

// }else{
//   return 'pemain dan panjang lintasan tidak valid'
// }
  

function diceRoll () {
let dice = Math.floor(Math.random()*6)

return dice
}
// console.log(diceRoll())

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  if(playerMax < 2){
    console.log('pemain kurang dari 2')
  } else if (trackLength < 15){
    console.log('Panjang trackkurang dari 15')
  }else{
    while(finished()){
      for(let i = 0; i < playerMax; i++ ){
        console.log(printLine(players[i].name, players[i].pos).join(''))
        
        players[i].pos += diceRoll()
      } 
      sleep()
      clearScreen()
    }
    console.log(winner())
  }
}

function printLine (player, pos) {
  let board = []

  for(let i = 0; i<trackLength; i++){
    if(pos === i){
      board.push(`${player}|`) //--> ambil player yg dari argv
    } 
    board.push('  |')
    
  }
  return board
}


function advance (player) {
  let pemain = 'abcdefghijklmnopqrstuvwxyz'
  let result = []

  for(let i = 0; i<playerMax; i++){
    
    let obj =
    {
      name: pemain[Math.floor(Math.random()*pemain.length)],
      pos: 0
    }
    result.push(obj)
  }  
  return result
}
// console.log(advance())

function finished () {
  for(let i=0 ; i<playerMax; i++){
    if(players[i].pos >= trackLength){
      return false
    }
  }
  return true
}

function winner () {
  for(let i =0; i<playerMax; i++){
    if(players[i].pos >= trackLength){
      return `pemenangnya ${players[i].name}`
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
printBoard()
// console.log(printLine());
