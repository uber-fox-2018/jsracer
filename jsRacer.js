// var argv= process.argv.slice(2)


// var player = Number(argv[0])
// var row = Number(argv[1])

// console.log(argv)
// console.log(player,row)
// printLine(player,row)


const alphabetPlayers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function diceRoll (row) {	
	num = Math.floor(Math.random()*row)
	return num
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (track, player, row, arr) {
	var isWinner = true
	let i = 0
	console.log(track)
	while (isWinner){
		for (let j = 0 ; j < track.length ; j++){
			var randomDice = diceRoll(player)
			console.log('dice:',randomDice)
			let randomPosition = arr[j].position + randomDice
			if (randomPosition < track[0].length){
				if (track[j][randomPosition] === '#'){
					track[j][randomPosition] = ' '
					track[j][arr[j].position] = ' '
					arr[j].position = 0
					
					console.log(`Player ${arr[j].name} out area`)
				}else if (track[j][randomPosition] === '$'){
					track[j][randomPosition] = '"'
					track[j][arr[j].position] = ' '
					arr[j].position += randomDice+1
					track[j][arr[j].position] = arr[j].name

					console.log(`Player ${arr[j].name} got +1 bonus dice`)
				}else {
					track[j][arr[j].position] = ' '
					arr[j].position += randomDice
					track[j][arr[j].position] = arr[j].name
				}
			}
			console.log(track)
			sleep(500)
			// console.log('\n')
			clearScreen()

			if (arr[j].position === track[0].length-1){
				var nameWinner = arr[j].name
				isWinner = false
			}
		}
	}
	winner(nameWinner)
}
	


function printLine (player, row) {
	
	let line=[]

	for (let i = 1 ; i <= player ; i++){
		var temp = []
		var trap = Math.floor(Math.random()*row)+1
		// console.log(trap)

		for (let j = 1 ; j <= row ; j++){
			if (j == trap){
				if (j % 2 == 0 && j+1 !== row.length && j+2 !== row.length-1){
					temp.push('$')	
				}else {
					temp.push('#')
				}
				
			}else {
				temp.push(' ')	
			}
			
		}
	line.push(temp)
	}


	var strPlayer = createPlayers(player)
	printBoard(line, player, row, strPlayer)

}

function createPlayers(strPlayer){
	var arrPlayer =[]
	for (let i = 0 ; i < strPlayer ; i++){
		var playerObj={}
		playerObj.name = alphabetPlayers[i]
		playerObj.position = 0
		arrPlayer.push(playerObj)
	}
	return arrPlayer
}

function winner (winner) {
	console.log(`Player ${winner} is the winner!`)

}

function clearScreen () {
  console.clear();
}

console.log(printLine(3,15))