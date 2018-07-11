let argv = process.argv

let player = Number(argv[2])
let track  = Number(argv[3])

if (player < 2 || track < 15) {
    console.log('Inputan player / track tidak valid');
}

var players = []

function createPlayer(player) {
    let dictPlayer = ['a','b','c','d','e']
    for (let i = 0; i < player; i++) {
        let obj = {
            name: dictPlayer[i],
            position: 0,
        }
        players.push(obj)
    }
    return players
}

// console.log(createPlayer(player));


function dice() {
    return Math.floor((Math.random()*6)+1)
}

// console.log(dice());

function printBoard(track) {
    let board = []
    
    for (let i = 0; i < players.length; i++) {
        let midArr = []
        if (players[i].position === 3 || players[i].position === 11) {
            players[i].position += 2
            console.log(`Player ${players[i].name} Get some Power`); 
        }
        for (let j = 0; j < track; j++) {
            if (players[i].position > track) {
                players[i].position = track-1
            }

            if (players[i].position === j) {
                midArr.push(players[i].name)
            }else if (j === 3 || j === 11) {
                midArr.push('$')
            }else {
                midArr.push(' ')
            }
        }
        board.push(midArr)
    }
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(' | '))
    }
    
}

// console.log(printBoard(track));

function advancePlayer(player) {
    return player.position += dice()
}

// console.log(advancePlayer({name: 'a', position: 0}));

function finished() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].position >= track-1) {
            return true
        }
    }
    return false
}

function winner() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].position === track-1) {
            return `Player ${players[i].name} is the Winner!!`
        }
        
    }
}

function reset_board() {
    console.log("\x1B[2J")
  }
  
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

function playGame() {
    let indexPlayer = 0
    createPlayer(player)
    while (finished() === false) {
        printBoard(track)
        advancePlayer(players[indexPlayer])
        sleep(500)
        reset_board()
        indexPlayer++
        if (indexPlayer === player) {
            indexPlayer = 0
        }
    }
    printBoard(track)
    console.log(winner());
    
}

playGame()