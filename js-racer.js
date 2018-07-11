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

function printBoard (numOfPlayers, trackLength) {

}

function printLine (player, pos, trackLength) {
  let line = [];

  for(let i = 0; i < trackLength; i++){
    if (i === pos){
      line.push (player)
    } else {
      line.push('-')
    }
  }
  return line.join('|');
}


console.log(printLine(0,0,trackLength));


function advance (playersObj) {

}

function finished (playersObj, trackLength) {

}

function winner (playersObj) {

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
