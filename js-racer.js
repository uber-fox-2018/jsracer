"use strict"

const input = process.argv.slice(2);
const numOfPlayers = Number(input[0]);
const trackLength = Number(input[1]);

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
  let powerUps = generatePowerUps (numOfPlayers, trackLength);
  printBoard(players, powerUps, trackLength);
  sleep(750);
  clearScreen();

  while (!finished(players, trackLength)){
    for (let i in players){
      advance(players[i]);
      if (finished(players, trackLength)){
        return winner(players);
      }
      printBoard(players, powerUps, trackLength);
      sleep(750);
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

function generatePowerUps (numOfPlayers, trackLength){
  let powerUps = [];
  
  for (let i = 0; i < numOfPlayers; i++){
    let PUPosition = 4 + Math.floor(Math.random() * (trackLength - 8))
    powerUps.push(PUPosition)
  }
  return powerUps
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

function printBoard (playersObj, powerUpsPos, trackLength) {
  for (let i in playersObj){
    printLine (playersObj[i], powerUpsPos[i], trackLength);
  }
}

function printLine (playerObj, powerUpPos, trackLength) {
  let name = playerObj.name;
  let position = playerObj.position
  let line = [];
  
  if (position === powerUpPos){
    position += 3;
    playerObj.position = position
    console.log(`${playerObj.name} got power-up! boosted by 3 km`)
  }

  for(let i = 0; i < trackLength; i++){
    if (i === position){
      line.push (name)
    } else if (i === powerUpPos){
      line.push ('$')
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
