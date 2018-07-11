"use strict"
const argv = process.argv.slice(2);
// var jumPemain = argv[0]
// var panTrack = argv[1]

var numOfPlayers = 3
var track = 15
var players = generatePlayers(numOfPlayers);
let randomTrap = Math.round(Math.random()*(track-1));
let randomBoost = Math.round(Math.random()*(track-1));

// console.log(pemain)

function generatePlayers(numOfPlayers){
  let result = [];
  let nameAbjad = 'abcdefghijklmnopqrstuvwxyz'
  for(let i =0; i<numOfPlayers; i++){
    let objPlayer = {
      name:nameAbjad[i],
      position:0
    }
    result.push(objPlayer);
  }
  return result
}
// console.log(generatePlayers())

// generatePlayer('A')



function diceRoll () {
  let randomDice = Math.random()*6;
  let result = Math.round(randomDice);
  return result
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

function printBoard() {
  let result = []
  // while(finished()){
  //   // let index = 0
    for(let i = 0; i<players.length;i++){
      if(players[i].position === randomBoost){
        players[i].position += 2
        console.log(`Player ${players[i].name} got booster !!`)
      }
      if(players[i].position === randomTrap){
        players[i].position -= 2
        console.log(`Player ${players[i].name} got trap !!`)
      }
      result.push(printLine(players[i].name,players[i].position).join(' '))
    }
    console.log(result)
    // for(let i = 0; i<result.length; i++){
    // } 
  //     let temp = [];
  //     result.push(printLine(pemain[i].name,pemain[i].position).join('')) ;
  //     pemain[i].position += advance();
    
  //     // kalo udah ada yangmenang berarti pemainnya selanjutnya ngga boleh kocok dadu
  //   }
  //   console.log(result)
  //   sleep()
  //   clearScreen()
  // }
  // winner()
}

// printBoard()

function printLine (playerName,playerPosition) {
  let result = [];
  for(let i = 0; i<track; i++){
    if(playerPosition > track){
      playerPosition = track-1
    }
    if(playerPosition === randomTrap){
      result.push('$')
    }
    if(playerPosition === randomBoost){
      result.push('%')
    }
    if(playerPosition === i){
      result.push(playerName+'|')
    }
    result.push('|')
  }
  return result
}

function advance(player){
  let diceRandom = diceRoll();

  // let result = pemain.position+ diceRandom

  return player.position + diceRandom;
}

function finished(){
  for(let i = 0; i<players.length;i++){
    if(players[i].position >= track-1){
      return true
    }
  }
  return false
}

function winner () {
  for(let i = 0; i<players.length; i++){
    if(players[i].position >= track){
      console.log(`winner is ${players[i].name}`)
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function startGame(){
  let indexPlayer = 0;
  while(finished() === false){
    printBoard();
    advance(players[indexPlayer]);
    sleep(500)
    clearScreen()
    indexPlayer++
    if(indexPlayer === numOfPlayers){
      indexPlayer = 0
    }
  }
  // console.log(advance(players[indexPlayer]))
  // printBoard();
  // console.log(winner())
}

//Driver Code
startGame()
