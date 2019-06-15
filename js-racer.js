"use strict"
const arr = process.argv.slice(2);//e.g. [3,20]
var playerNum = Number(arr[0]);//3
var distance = Number(arr[1]);//20
var players = advance(playerNum);//advance(3) 
/* players is created using function advance (playerNumber). The output is like this:
Assume playerNum is 3.
[ { name: 'R', position: 0 },
  { name: 'U', position: 0 },
  { name: 'R2', position: 0 } ]
 */

 /* To determine how many steps forward the player should go */
function diceRoll () {
    let num = Math.floor(Math.random()*7); //from 1 - 6
    return num;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printallPLayerOntrack(players){
  for(let i=0; i<playerNum; i++){
    console.log( printLine(players[i].name, players[i].position));
  }
}

function printBoard () {
  var stopGame = false;
  if(playerNum < 2 && distance < 15){
    console.log("Hey! You need another player! Also, go further!");
  }else if(playerNum < 2){
    console.log("Minimum 2 players! The more the merrier!");
  }else if(distance < 15) { //msh bisa diubah
    console.log("Minimum distance is 15! It will be fun!");
  }else{
    while(!stopGame){ //while true OR while players[i].position < "distance" DO ...
      console.log(players);
      for(let i=0; i<playerNum; i++){
         //invoke function printline(player,pos) here
        players[i].position += diceRoll();
        clearScreen();
        printallPLayerOntrack(players);
        sleep(1000);
        if(finished()===false){
          stopGame = true;
          break;
        }
      }
    } 
    console.log(winner());
  }
}

function printLine (player, pos) {
    let board = [];
    for(let i=0; i<distance; i++){
      if(pos === i){ // IF players[i].position === i
        board.push(` ${player}  |`); // PUSH players[i].name to "board"
      }else if(pos>=distance-1 && i=== distance-1){
        board.push(` ${player}  |`);
      }
      else{
        board.push('    |');
      }
    }
    return board.join(""); //don't forget to join the board so that we return the board as string not array
}

/* Explanation of how function printLine (player, pos) works
Assume that:
var playerNum =3
var distance = 2
var players = [ 
  { name: 'A', position: 0 },
  { name: 'B', position: 1 },
  { name: 'C', position: 0 } 
]
when run printLine(player,pos), the output will be like this for each player:

player  , pos          board (before joined)                board.join("")
  A     , 0       [ ' A |', '     |', '     |' ]          A |     |     |
  B     , 1       [ '   |', ' B   |', '     |' ]            | B   |     |
  C     , 0       [ ' C |', '     |', '     |' ]          C |     |     |

"pos" is seen as "i" in function printLine()
*/

/* Make an array object of each player */
//Here, we will determine the name and position of each player
function advance (playerNumber) { 
  var players = []
  for (let i = 0; i < playerNumber; i++) {
    let playerObj = {};
    let randomPlayerName = String.fromCharCode(Math.floor((Math.random()*25)+65)); //ramdomise A-Z
    playerObj.name = randomPlayerName; 
    //check if the name exists to avoid double names
    if(players.length>0){
      for(var player of players){
        if(player.name === playerObj.name){//if yes
         playerObj.name = randomPlayerName+2; //add 2 next to the name, e.g. R2
        }
      }
    } 
    playerObj.position = 0;
    players.push(playerObj);
  }
  return players;
}

/* To find out whether the player has reached the end of "distance" */
function finished () {
  for(let i=0; i<playerNum; i++){
    if(players[i].position >= distance){
      return false;
    }
  }
  return true;
}

function winner () {
  for(let i=0; i<playerNum; i++){
    if(players[i].position >= distance-1){
      return `The winner is ${players[i].name}!`
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
  // console.log("\x1B[2J");
}

printBoard()

