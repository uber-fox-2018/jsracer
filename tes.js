"use strict"
let jumlahPlayer =  Number(process.argv[2])
let panjangLintasan = Number(process.argv[3])
let players ;

function diceRoll () {
let dice = 1 + Math.floor(Math.random()*6)
return dice
}

function initialPlayer (){
  let dataPlayer = []
  let step = 0
  let karakter = 'abcdefghijklmnopqrstuvwxyz'
  for (var i=0 ; i < jumlahPlayer ; i++){
    let cekplayer = []
    cekplayer['nama'] = karakter[i],
    cekplayer['posisi'] = step
    dataPlayer.push(cekplayer)
  }
  players = dataPlayer
  
  
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
    initialPlayer()
    console.clear()
    while (true){
    for (var i=0 ; i < jumlahPlayer ; i++){
        console.log(printLine(i))
        sleep(500)
        console.clear()
        advance(i)
        if(players[i].posisi >= panjangLintasan -1){
            console.log(printLine(i))
            console.log('pemenang adalah ' + players[i].nama)
            
            return;

        }
    }
    
    }
}
printBoard ()

function printLine () {    
let lintasanSemua = []

    for (var j=0 ; j < jumlahPlayer ; j++){
        let lintasan = []    
        if (players[j].posisi >= panjangLintasan-1){
            players[j].posisi = panjangLintasan-1
        }
        for (var i=0 ; i < panjangLintasan ; i++){
            if (players[j].posisi == i){
                lintasan.push(players[j].nama)
            }
            else {
                lintasan.push(' ')
            }
        }
    lintasanSemua.push(lintasan.join('|'))
    }
return lintasanSemua.join('\n')
} 

function advance (playerIndex) {
    let langkah = diceRoll()
    players[playerIndex].posisi += langkah  
}
