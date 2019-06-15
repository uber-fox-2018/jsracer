"use strict"
var player = process.argv[2]
var pos = process.argv[3]

function diceRoll (num) {
    return Math.round(Math.random(num) * 6)
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
    if(pos < 15) return 'Panjang lintasan minimal 15'
    else if(player < 2) return 'jumlah pemain minimal 2'
    var namaPlayer = 'abcdefghijklmnopqrstvwxyz'
    var a = 0
    var res = []
    
    for(var i = 1 ; i <= player ; i++){
        res.push(printLine(i,pos))
    }

    var turns = {}
    for(var i = 0 ; i < player ; i ++){
        turns['player ' + i] = 0
    }

    // turns['player ' + 0]+=1
    
    
    for(var i = 0 ; i < pos ; i++){
        
        for(var j = 0 ; j < player ; j++){
            var dadu = diceRoll(turns['player '+j])
            if(turns['player '+j] >= pos){
                return 'pemenangnya ' + namaPlayer[j]
            }
            sleep()
            clearScreen()
            console.log(res.join('\n'))
            
            var tmp = res[j][turns['player '+j]]
            res[j][turns['player '+j]] = res[j][turns['player '+j]+dadu]
            res[j][turns['player '+j]+dadu] = tmp
            turns['player ' + j]+=dadu
        }
        
    }

    console.log(res)


}
console.log(printBoard())

function printLine (player, pos) {
    var result = []
    var namaPlayer ='abcdefghijklmnopqrstuvwxyz'
    for(var i = 0 ; i < pos ; i++){
        result.push('|')
    }
    
    for(var i = 0 ; i < player ; i++){
        result[0] = namaPlayer[i]
    }
    
    return result
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
  console.clear()
}