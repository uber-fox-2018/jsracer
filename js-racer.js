const listPemain = [
  { nama: "A", pos: 0 },
  { nama: "B", pos: 0 },
  { nama: "C", pos: 0 },
  { nama: "D", pos: 0 },
  { nama: "E", pos: 0 },
  { nama: "F", pos: 0 },
  { nama: "G", pos: 0 },
  { nama: "H", pos: 0 },
  { nama: "I", pos: 0 },
  { nama: "J", pos: 0 },
  { nama: "K", pos: 0 },
  { nama: "L", pos: 0 },
  { nama: "M", pos: 0 },
  { nama: "N", pos: 0 },
  { nama: "O", pos: 0 },
  { nama: "P", pos: 0 },
  { nama: "Q", pos: 0 },
  { nama: "R", pos: 0 },
  { nama: "S", pos: 0 },
  { nama: "T", pos: 0 },
  { nama: "U", pos: 0 },
  { nama: "V", pos: 0 },
  { nama: "W", pos: 0 },
  { nama: "X", pos: 0 },
  { nama: "Y", pos: 0 },
  { nama: "Z", pos: 0 },
];

function dadu() {
  return Math.ceil(Math.random() * 6);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
          break;
      }
  }
}

function papan(jlhPemain, panjangLintasan) {
  var arr = [];

  for(let i = 0; i < jlhPemain; i++) {
      let track = printTrack(listPemain[i], panjangLintasan);
      
      if(listPemain[i].pos + dadu() >= panjangLintasan) {
          listPemain[i].pos = panjangLintasan
      } else {
          listPemain[i].pos += dadu()
      }
      
      arr.push(track)
  }
  // return tampil(arr);
      return arr;
}

function printTrack(pemain, panjangLintasan){
  let arrIn = []
  for(let j = 0; j < panjangLintasan; j++) {
      if(j == pemain.pos) {
          arrIn.push(pemain.nama);
      } else {
          arrIn.push(' ');
      }
  }
  return arrIn.join(' | ')
}

function tampil(arr) {
  // console.clear();
  console.log(arr.join('\n'));
}

let argv = process.argv.slice(2);
let jlhPemain = Number(argv[0]);
let panjangLintasan = Number(argv[1]);

function play(){
  while(!finished(listPemain, panjangLintasan)) {
      let board = papan(jlhPemain, panjangLintasan)
      console.clear();
      console.log(board)
      console.log('\n')
      sleep(1000)
  }
 
  
  console.log(winner(listPemain));
}

function finished(listPemain, panjangLintasan) {
  for (let i in listPemain) {
      if (listPemain[i].pos >= panjangLintasan ) {
          return true;
      }
  }
  return false;
}

function winner(listPemain) {
  for (let i in listPemain) {
      if (listPemain[i].pos >= panjangLintasan) {
          return `Pemenang adalah : ${ listPemain[i].nama }`;
      }
  }
}

play()
// papan(jlhPemain, panjangLintasan);
// console.log(finished());