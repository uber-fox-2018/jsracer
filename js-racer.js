"use strict"

const input = process.argv.slice(2);
const numOfPlayers = input[0];
const trackLength = input[1];

if (numOfPlayers < 2){
  console.log('The minimum number of players is 2');
}
if (trackLength < 15){
  console.log('Minimum length of the track is 15');
}
if (numOfPlayers >= 2 && trackLength >= 15){
  race (numOfPlayers, trackLength)
}

function race (numOfPlayers, trackLength){
  let players = generatePlayers(numOfPlayers);

  printBoard(players, trackLength);
  sleep(450);
  clearScreen();

  while (!finished(players, trackLength)){
    for (let i in players){
      advance(players[i]);
      if (finished(players, trackLength)){
        return winner(players);
      }
      printBoard(players, trackLength);
      sleep(450);
      clearScreen();
    }
  }
}

function generatePlayers (num) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let players = [];
  let startingPosition = 0;

  for (let i = 0; i < num; i++){
    let indexRandom = Math.floor(Math.random () * alphabet.length);
    let player = alphabet[indexRandom];
    let playerObj = {
      name: player,
      position: startingPosition,
    }

    players.push(playerObj);
  }
  return players;
}

function diceRoll () {
  return Math.ceil(Math.random() * 6);
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (playersObj, trackLength) {
  for (let i in playersObj){
    printLine (playersObj[i], trackLength)
  }
}

function printLine (playerObj, trackLength) {
  let name = playerObj.name;
  let position = playerObj.position
  let line = [];

  for(let i = 0; i < trackLength; i++){
    if (i === position){
      line.push (name)
    } else {
      line.push(' ')
    }
  }
  line.push('|')
  line.unshift('|')
  console.log(line.join('|'));
}

function advance (playerObj) {
  let position = playerObj.position;
  position += diceRoll();
  playerObj.position = position;
  
  return playerObj;
}

function finished (playersObj, trackLength) {
  for (let i in playersObj){
    if (playersObj[i].position >= trackLength){
      return true;
    }
  }
  return false;
}

function winner (playersObj) {
  for (let i in playersObj){
    if (playersObj[i].position >= trackLength){
      console.log(`Race is over, we got ${playersObj[i].name} as the winner!`) ;
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
