"use strict"
function diceRoll() {
  return getRandomInt(6) + 1;
}

//returns random int from 0 to max - 1
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//prints the whole board
function printBoard() {
  let board = [];
  let line;
  for (let i = 0; i < players.length; i++) {
    line = printLine(players[i]);
    board.push(line);
  }
  console.log(board.join('\n'));
}

//returns the drawing of each lines
function printLine(player) {
  let lineArr = [];
  let label = player.label;
  let pos = player.position;

  if (pos >= lineLength)
    pos = lineLength - 1;

  let boxIdx = 0;

  for (let i = 0; i < lineLength; i++) {
    if (i === pos)
      lineArr.push(label);
    else if (i === boxPositions[player.id][boxIdx]) {
      lineArr.push('$');
      boxIdx++;
    }
    else
      lineArr.push(' ');
  }
  return lineArr.join(' | ');
}

function advance(player) {
  let steps = diceRoll();
  player.position += steps;
  stateMessages.push(`${player.name} get ${steps} steps.`);
  getThroughBox(player.id);
}

function getThroughBox(playerIdx) {
  let content = {};
  let targetPlayer = {};
  let i = 0;
  while (players[playerIdx].position >= boxPositions[playerIdx][0]) {
    boxPositions[playerIdx].splice(0, 1);
    content = generateRandomBox();
    stateMessages.push(`${players[playerIdx].name} got a ${content.name}.`);
    if (content.target === 'self')
      targetPlayer = players[playerIdx];
    else
      targetPlayer = players[getRandomPlayerIndex()];
    stateMessages.push(`${content.message} ${content.target === 'enemy' ? targetPlayer.name + '.' : ''}`)
    stateMessages.push(`${targetPlayer.name} ${content.steps > 0 ? '+' : ''}${content.steps} steps.`);

    targetPlayer.position += content.steps;
    i++;
  }
  return;
}

function getRandomPlayerIndex(playerIdx) {
  let idx = getRandomInt(players.length);
  if (idx !== playerIdx)
    return idx;
  return getRandomPlayerIndex(playerIdx);
}

function generateRandomBox() {
  let contents = [
    { name: 'land mine', target: 'self', steps: -2, message: 'AAAaaa...!' },
    { name: 'spring trap', target: 'self', steps: -4, message: 'Ouch!' },
    { name: 'bomb', target: 'enemy', steps: -2, message: 'Kaboom! Throws a bomb to ' },
    { name: 'missile', target: 'enemy', steps: -4, message: 'Dhuaaar...! Fires a missile to ' },
    { name: 'spring booster', target: 'self', steps: 2, message: 'Yaay! Leap forward.' },
    { name: 'rocket booster', target: 'self', steps: 4, message: 'Whooosh...! Flies with a rocket.' },
  ]

  let roll = diceRoll() - 1;
  return contents[roll];
}

function finished() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].position >= lineLength - 1) {
      winner(players[i]);
      return true;
    }

  }
  return false;
}

//function winner() => add param player
function winner(player) {
  console.log(`${player.name} is the winner.`);
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

//Initialize players.
//Minimum players to participate is 2.
function initializePlayers(playerCount = 2) {
  var alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let result = [];
  let player;
  for (let i = 0; i < playerCount; i++) {
    player = {};
    player['id'] = i;
    player['label'] = alphabets[i];
    player['name'] = 'Player ' + alphabets[i];
    player['position'] = 0;
    result.push(player);
  }

  return result;
}

//Initialize box positions.
//Default box positions is every 5 column excluding last column
function initializeBoxPositions() {
  let boxPositions = [];
  let colRepeat = 5;
  let row;
  for (let i = 0; i < players.length; i++) {
    row = [];
    let j = 1;
    let pos = 0;
    while (pos < lineLength-colRepeat) {
      pos = colRepeat * j;
      row.push(pos);
      j++;
    }
    boxPositions.push(row);
  }
  return boxPositions;
}

//Print state messages
function printStateMessages() {
  for (let i = 0; i < stateMessages.length; i++) {
    console.log(stateMessages[i]);
  }
  stateMessages.length = 0;
}

//global variable
let players = [];
let lineLength = 0;
let boxPositions = [];
let stateMessages = [];

//main function
(function () {
  let args = process.argv.slice(2);
  
  if(args.length === 0) {
    printHelp();
    return;
  }
  
  let playerCount = args[0];
  lineLength = args[1];

  if(playerCount < 2) playerCount = 2;

  if(lineLength < 15) playerCount = 15;


  clearScreen();

  players = initializePlayers(playerCount);
  boxPositions = initializeBoxPositions(boxPositions);

  console.log('start');
  printBoard();

  while (true) {
    for (let i = 0; i < playerCount; i++) {
      sleep(5000);
      clearScreen()
      advance(players[i]);
      printBoard();
      printStateMessages();
      if (finished()) {
        return;
      }
    }
  }
}());

function printHelp() {
  console.log('Usage: node js-racer.js [player count] [line length]');
  console.log('Requirements:')
  console.log('\tplayer count minimum 2');
  console.log('\tline length minimum 15');
  console.log('Notes:');
  console.log('\teach player will advance to finish line by steps determined by a dice roll');
  console.log("\teach 5 steps there are random boxes ('$') one of each these item:");
  console.log('\t\t1. spring trap; move the player 2 steps backward');
  console.log('\t\t2. land mine; move the player 4 steps backward');
  console.log('\t\t3. spring booster; move the player 2 steps forward');
  console.log('\t\t4. rocket booster; move the player 4 steps forward');
  console.log('\t\t5. bomb; move another player randomly 2 steps backward');
  console.log('\t\t6. missile; move another player randomly 2 steps backward');
}