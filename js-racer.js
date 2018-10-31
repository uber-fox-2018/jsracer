"use strict"
const argv = process.argv.slice(2)
var totalPlayer = Number(argv[0])
var track = Number(argv[1])
var player = generatePlayer(totalPlayer)

function diceRoll () {
    let dice = Math.floor(Math.random()*6)
    return dice
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
  
  if (totalPlayer < 2) {
    console.log('Jumlah pemain minimal 3 brooo !!');
  }else if (track < 15) {
    console.log('Panjang track minimal 15 cuyyy !!');
  }else{
    while(finished()){
      for(let i=0; i<totalPlayer; i++){
        console.log(printLine(player[i].name, player[i].position).join(''));
        // console.log(player[i].position);
        if(player[i].position === 4){
          player[i].position += 10
          console.log('Kamu mendapatkan tenaga tambahan broooo !!!');
          
        }
        player[i].position += diceRoll()
      }
      sleep(3000)
      clearScreen()
    } 
    console.log(winner())
  }
}

function printLine (player, pos) {
    let lineBoard = []
    let randomPower = Math.floor(Math.random() * (track - 8))

    for(let i=0; i<track; i++){
      if(pos === i){
        lineBoard.push(` ${player}|`)
      }else if(i === randomPower){
        lineBoard.push(` $|`)
      }
      lineBoard.push('  |')
    }
    return lineBoard
}

function generatePlayer (player) {
  let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var players = []

  for (var l = 0; l < player; l++) {
    var peserta = {};
    peserta['name'] = alpha[Math.floor(Math.random()*alpha.length)];
    peserta['position'] = 0;
    players.push(peserta);
  }

  return players
}

function finished () {
  console.log(player);
  for(let i=0; i<totalPlayer; i++){
    
    if(player[i].position >= track){
      return false;
    }
  }
  return true;
}

function winner () {
  for(let i=0; i<totalPlayer; i++){
    if(player[i].position >= track){
      return `Pemenangnya adalah ${player[i].name} coyyy !!`
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


printBoard()

// console.log(player)