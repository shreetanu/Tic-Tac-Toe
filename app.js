const statusDisplay = document.querySelector(".status");

let gameActive = true;

let currentPlayer = 'X';

let gameState = ["","","","","","","","",""];

function winningMessage(){
    return `Player ${currentPlayer} has won the game!`;
}

function drawMessage(){
    return "It's a draw :(";
}

function currentPlayerTurn(){
    return `${currentPlayer}'s turn`;
}

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white"); 
}

function handlePlayerChange(){
    currentPlayer = currentPlayer==="X"?"O":"X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleResultValidation(){
    let roundWon = false;
    for(let i=0;i<=7;i++)
    {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if(a==='' || b==='' || c==='')
         {   continue; }
        if( a===b && b===c)
        {    roundWon = true;
            p = winningCondition[0].toString();
            q = winningCondition[1].toString();
            r = winningCondition[2].toString();
            document.getElementById(p).style.backgroundColor = "green";
            document.getElementById(q).style.backgroundColor = "green";
            document.getElementById(r).style.backgroundColor = "green";
             break;
        }
    }

    if(roundWon)
    {
        statusDisplay.innerHTML = winningMessage();
        gameActive  = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}


function handleCellClick(cellevent){
    const clickedCell = cellevent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

    if(gameState[clickedCellIndex]!== "" || !gameActive)
        return;
    
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();

} 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

