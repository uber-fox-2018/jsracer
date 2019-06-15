"use strict"
let argv= process.argv.slice(2)
var playersCount= argv[0]
var trackLength= argv[1]
var players


function diceRoll () {
    var idx= Math.floor((Math.random() * 6) + 1);      
    return idx
}

function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//-------------------------------------------------------------------------------//

function printBoard () {
    generatePlayers()
    clearScreen()

    while (true) {
        //console.log (printLine())
        for (var j=0; j<players.length; j++) {
            console.log(printLine(playersCount))
            sleep(500)
            clearScreen()
            advance(j)
            if (players[j]['pos'] >= trackLength) {
                console.log(printLine(playersCount))
                console.log ('The winner is '+ players[j]['player'])
                sleep(500)
                return 
            }
        }
    }
}
printBoard()


function generatePlayers() {
    let alf= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var player_pos= []
  
    for (var i=0; i<playersCount; i++) {
      var detail= {}
      detail.player= alf[i]
      detail.pos= 0
      player_pos.push(detail)
    }
    players= player_pos
    //console.log (players)
}


function printLine (jmlhplayer) {
    
    var tracks=[]
    for (var i=0; i<jmlhplayer; i++) {
        var track= []

        if (players[i]['pos']>=trackLength) {
            players[i]['pos']=trackLength-1
        }

        for (var j=0; j<trackLength; j++){
            if (players[i]['pos']===j) {
                track.push(players[i]['player'])
            } else {
                track.push(' ')
            }
        }
        tracks.push(track.join('|'))
    }
    
    return tracks.join('\n')
}


function advance (playeridx) {
    players[playeridx]['pos']+=diceRoll() 
}

function finished () {

}

function winner () {

}




