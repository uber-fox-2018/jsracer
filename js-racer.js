"use strict"
var command = process.argv.slice(2)
// var player = 2
// var track = 20
var player = Number(command[0])
var track = Number(command[1])
var pemain = advanced_player(player)

// console.log(pemain)

function dice() {
  var speed = Math.floor(Math.random() * 3) + 1;
  return speed;
}

function sleep(milliseconds) {

  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
// sleep(2000)
function print_board() {

  if (player < 2) {

    console.log('pemain tdk cukup')
  }
  else if (track < 15) {

    console.log('track kurang panjang')
  } else {



  }
  while (finished()) {

    for (let i = 0; i < player; i++) {
      console.log(print_line(pemain[i].name, pemain[i].pos).join(''));
      pemain[i].pos += dice()
    }
    sleep()

    clearScreen()
  }

  console.log(winner())
}
print_board()
function print_line(pemain, pos) {
  let arr = []

  for (let i = 0; i <= track; i++) {
    if (pos === i) {
      arr.push(` ${pemain}|`)
    }
    arr.push('  |')
  }
  return arr
}

function advanced_player(player) {


  var possiblePlayer = "abcdefghijklmnopqrstu";
  var abc = ''
  for (let i = 0; i < player; i++) {
    abc += (possiblePlayer.charAt(Math.floor(Math.random() * possiblePlayer.length)))
  }

  var playerArr = []
  let obj = {}
  for (let i = 0; i < abc.length; i++) {

    obj = {
      name: abc[i],
      pos: 0
    }
    playerArr.push(obj)
  }

  return playerArr
}

function finished() {
  console.log(pemain)

  for (let i = 0; i < player; i++) {
    if (pemain[i].pos >= track) {
      // console.log(pemain[i].pos);
      return false
    }

  }
  return true

}

function winner() {

  for (let i = 0; i < player; i++) {

    if (pemain[i].pos >= track) {
      return (`Pemain ${pemain[i].name} juara 1`);

    }

  }

}

function clearScreen() {

  console.clear()

}


advanced_player()
