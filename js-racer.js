"use strict"
const argv = process.argv.slice(2)
const players = argv[0]
const track = argv[1]

if(players >= 2 && track >= 15) {
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
  
  function printBoard () {
  
  }
  
  function printLine (player, pos) {
  
  }
  
  function advance (player) {
  
  }
  
  function finished () {
  
  }
  
  function winner () {
  
  }
  
  function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
} else if (players === undefined){
  return `node js-racer <input_players_min_2> <input_track_min_15>`
} else {
  return `your input players and track is invalid`
}
