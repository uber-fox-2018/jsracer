"use strict"

let argv = process.argv.slice(2);
let userAmount = argv[0];
let trackLength = argv[1];

function diceRoll () {
  return Math.floor(Math.random() * 6);
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }

}

// to get user's name and position
function generatePlayer(user) {
  let userName = 'abcdefghijklmnopqrstuvwxyz';
  let players = [];
  for(let i = 0; i < user; i++) {
    let dataPlayer = {};
    for(let j = 0; j < userName.length-1; j++) {
      if(i === j) {
        dataPlayer['name'] = userName[j];
        dataPlayer['pos'] = 0;
      }
    }
    players.push(dataPlayer);
  }

  return players;

}

let finished = false;
let winner = '';
function printBoard (players) {
  if(players.length < 2) {
    return `Please invite your friends!`;
  }

  let board = [];
  for(let i = 0; i < players.length; i++) {
    let name = players[i].name;
    let pos =  players[i].pos;
    board.push(printLine(name, pos));
    players[i].pos += diceRoll();
    if(players[i].pos >= trackLength) {
      finished = true;
      winner = players[i].name;
    }
  } 

  return board;

}

function play(){
  let players = generatePlayer(userAmount);
  
  let i = 0;
  while(finished === false) {
    let board = printBoard(players);
    console.log(board);
    sleep();
    clearScreen();
    console.log('\n');
    i++;
  }

  console.log(`The winner is: ${winner.toUpperCase()}`);

}

function printLine (player, pos) {
  let getPlayer = generatePlayer(userAmount);
  let line = [];
  for(let i = 0; i < trackLength; i++) {
    if(i === pos) {
      line.push(player);
    }
    line.push(' ');
  }
  return line.join('|');

}

function advance (player) {

}


function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

play();