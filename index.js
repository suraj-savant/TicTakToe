const box = document.getElementsByClassName("box");
const warn = document.getElementById("warn");
const msgDis = document.getElementById("turn");
let turn = 'X';
let warnStack = [];
let gameOver = false;
let playerWins = false;


function clicked(index) {
    if (!gameOver) {
        if (box[index].innerText == '') {
            box[index].innerText = turn;
            turn = changeTurn();
            warn.style.display = 'none';
            if ((warnStack.length != 0)) {
                for (let indexes of warnStack)
                    box[indexes].style.color = 'blue';
                warnStack.splice(0, warnStack.length);
            }
        } else {
            warn.style.display = 'block';
            box[index].style.color = 'red';
            warnStack.push(index);
        }
        checkGame();
        checkWin();
        if (!gameOver)
            msgDis.innerText = `Turn for player : ${turn}`;      
    } else {
        if (!playerWins) 
            msgDis.innerText = "Game Draw";
        else 
            msgDis.innerText = `Congratulations!! Player ${playerWins} wins`;        
        document.getElementById("gameOvr").style.display = 'block';
    }
}

const changeTurn = () => (turn === 'X') ? '0' : 'X';

function checkGame() {
    let countEmpty = 0;
    
    for (let i = 0; i < 9; i++) 
        if (box[i].innerText == '') 
            countEmpty++;        
    
    if (countEmpty == 0) {
        gameOver = true;
        clicked();
    }
}


function checkWin() {
    let win;
    const winBlocks = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    winBlocks.forEach((block) =>
        (box[block[0]].innerText == box[block[1]].innerText) && (box[block[0]].innerText == box[block[2]].innerText) && (box[block[0]].innerText != '') ?
            win = box[block[0]].innerText : null
    );

    if (win != null) {
        playerWins = win;
        gameOver = true;
        clicked();
    }
}


function playAgain(){
turn = 'X';
warnStack = [];
gameOver = false;
playerWins = false;

for(i=0; i<9; i++)
  box[i].innerText = "";
     
  document.getElementById("gameOvr").style.display = 'none';  
  msgDis.innerText = `Turn for player : ${turn}`;
}
