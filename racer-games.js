"use strict"
const argvDisplay = process.argv.slice(2)
const player = argvDisplay[0]
const pos = argvDisplay[1]
let resultPlayer = getPlayer()


function diceRoll() {
    let dice = Math.floor((Math.random()*6)+1)
    return dice
}

function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
}

function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function getPlayer(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let result = []
    for(let i = 0; i < player; i++){
        let temp = []
        temp.push(alphabet[i])
        temp.push(0)
        result.push(temp)
    }
    return result
}

function getLine(){
    let resultLine = []
    for(let i = 0; i <= pos; i++){
        resultLine.push('| ')
    }
    return resultLine
}

function gameRace(){

    for(let loop = 0; loop === 0;){
        let trigger = false
        let updateGame = ''
        let winners = ''
        
        for(let i = 0; i < resultPlayer.length; i++){

            let playerName = resultPlayer[i][0]
            // let playerPos = resultPlayer[i][1]
            let totalLine = getLine() 

            for(let j = 0; j < totalLine.length; j++){
                if(resultPlayer[i][1] >= pos){
                    trigger = true
                    totalLine[totalLine.length-1] = '|' + playerName
                    winners = playerName
                }

                if(resultPlayer[i][1] === j){
                    totalLine[j] = '|' + playerName
                }
            }
            
            updateGame += totalLine.join('') + '\n'
            resultPlayer[i][1] += diceRoll()
        }

        console.log(updateGame)
        console.log(resultPlayer)
        sleep(3000)
        console.clear()

        if(trigger){
            console.log(winner(updateGame, winners))
            sleep(3000)
            return ""
        }

    }
}

console.log(gameRace())

function winner(updateGame, winners){
    return updateGame + ' the winner is ' + winners
}
