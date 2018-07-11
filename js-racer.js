"use strict"
const argv = process.argv.slice(2)
var totalPlayers = argv[0]
var track = argv[1]
var jackpot = Math.floor(Math.random()*track)-1
var trap = Math.floor(Math.random()*track)-1
var blackhole = Math.floor(Math.random()*track)-1


// console.log(argv[0]);
if(totalPlayers < 2 || track < 15){

  console.log('jumlah pemain (minimal 2) atau panjang lintasan (minimal 15) tidak valid');

}else{

  function diceRoll () {
    
    var nilai = Math.floor(Math.random()*3)
    return nilai
  }

  

  function genPlayers (totalPlayers){
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    var arr = []
    for(var i = 0; i < totalPlayers; i++){
      var obj = {
        name : alphabet[i],
        pos : 0,
        status : true
      }
      arr.push(obj)
    }
    return arr
  }
  
  
  function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {var obj = {
    }
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  

  function printBoard (players) {
    var board = []
    while(!finished(players)){
    if(totalPlayers > 0){
      for(var i = 0; i < players.length; i++){
        if(players[i].status === true){
          board.push(printLine(players[i].name, players[i].pos, jackpot, trap, blackhole))
          players[i].pos = advance(players[i],jackpot, trap, blackhole)
          if(players[i].pos >= track){
            return `the winner is ${players[i].name}`
          }else if(players[i].pos === -1){
            board.splice(i,1)
            players[i].status = false
            totalPlayers --
          }
        }
      }
      console.log(board.join('\n'));
      board = []
      console.log('\n\n\n\n');
      sleep(1000)
      finished(players)
    
    }else{
      return 'all players are die'
    }
       
    }
    
   
    
  }
  
  var players = genPlayers(totalPlayers)
  console.log(printBoard(players));
  
  function printLine (playerName, playerPos, jackpot, trap, blackhole) {
    var arr = []
    for(var i = 0; i < track; i++){
      if(i === playerPos){
        arr.push(playerName)
      }else if( i === jackpot){
        arr.push('$')
      }else if(i === trap){
        arr.push('#')
      }else if(i === blackhole){
        arr.push('@')
      }
      else{
        arr.push(' ')
      }
    }
    return arr.join('|')
    
  }

  
  
  function advance (player,jackpot, trap, blackhole) {
    player.pos += diceRoll()
    if(player.pos === jackpot){
      player.pos += 2
      console.log(`${player.name} get the super power`);
    }else if(player.pos === trap){
      console.log(`${player.name} is trapped`);
      player.pos -= 2
    }else if(player.pos === blackhole){
      console.log(`${player.name} die`);
      
      return -1
    }
    return player.pos
    
  }


  
  
  function finished (palyerArr) {
    for(var i = 0; i < palyerArr.length; i++){
      if(palyerArr[i].pos >= track){
        return true
      }
    }
    return false
  }
  
  function winner (players) {
    // return `the winner is ${name}`
    for(var i = 0; i < players.length;i++){
      if(players[i].pos >= track){
        return `the winner is ${players[i].name}`
         
      }
    }
  }
  
  function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
  
}


