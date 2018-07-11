"use strict"
let argv = process.argv
let totalPlayers = Number(argv[2]);
let trackLength = Number(argv[3]);
let winningPlayer = '';

function diceRoll () {
return (Math.floor(Math.random() * 6));
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

let listOfRacers = [];
function allRacers(totalPlayers) {
  var racers = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < totalPlayers; i++) {
    let playerObj = {
      name: racers[i],
      position: 0
    }
    listOfRacers.push(playerObj);
  }
  // console.log(listOfRacers);
  return listOfRacers;
}
// console.log(allRacers(totalPlayers));

function printBoard() {
  for (let i = 0; i < listOfRacers.length; i++) {
    let rows = printLine(listOfRacers[i].name, listOfRacers[i].position);
    console.log(rows);
  }
}

function printLine (player, pos) {
  let arr = [];
  let powerUp = 5;
  
  for (let i = 0; i <= trackLength; i++) {
    if(pos === powerUp) {
      pos += 3;
      console.log('POWER UP!');
    }
    if (i === pos) {
      arr.push('|   ' +player+ '');
    } else if (i > trackLength) {
      arr.push('|  |');
    } else if(i === powerUp) {
      arr.push('*')
    } else {
      arr.push('|    ');
    }
  }
  return arr.join('');
}

function advance (player) {
  let newPos = player.position + diceRoll();
  if (newPos > trackLength - 1) {
    newPos = trackLength - 1;
    player.position = newPos;
    winningPlayer = player.name;
  } else {
    player.position = newPos;
  }
  // console.log(player);
  return player;
}

function finished () {
  for (let i = 0; i < listOfRacers.length; i++) {
    if (listOfRacers[i].position === trackLength - 1) {
      return true;
    }
  }
  return false;
}

function race() {
  if (totalPlayers < 2 && trackLength < 15) {
    console.log('Minimum players: 2 & Track minimum: 15');
  } else {
    allRacers(totalPlayers);
    printBoard();
    let playerMovement = 0;
    while(finished() === false) {
      sleep(500);
      clearScreen();
      advance(listOfRacers[playerMovement]);
      playerMovement++;
      printBoard();
      if (playerMovement === totalPlayers) {
        playerMovement = 0;
      }
    }
  }
  winner();
}

function winner () {
  for (let i = 0; i < listOfRacers.length; i++) {
    if (listOfRacers[i].position === trackLength - 1) {
      console.log(`Player ${winningPlayer} is the winner`);
    }
  }

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


race();