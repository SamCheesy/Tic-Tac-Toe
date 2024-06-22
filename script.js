const buttons = document.querySelectorAll("button");
const LOG = document.getElementById("log");

let row_1 = document.getElementById("row-1");
let row_2 = document.getElementById("row-2");
let row_3 = document.getElementById("row-3");
let allRows = document.querySelectorAll(".row");
let numOfClicks = 0;

for(button of buttons){
    button.addEventListener('click', (event)=>{
        event.target.disabled = true;
        numOfClicks+=1;
        const VERIFICATION = verifyTurn(numOfClicks);
        LOG.innerHTML = `<b>Turno del ${VERIFICATION[0]}.</b>`;
        let player = VERIFICATION[0];
        let image = VERIFICATION[1];
        let imageTag = document.createElement('img');
        imageTag.setAttribute('src', image);
        event.target.appendChild(imageTag);
        event.target.classList.add("hasMark");
        const board = verifyPos();
        verifyTie();
        verifyWin(board);
        if(LOG.innerHTML === "<b>El jugador 1 ha ganado!</b>" || 
           LOG.innerHTML === "<b>El jugador 2 ha ganado!</b>" ){
            console.log("hola");
            buttons.forEach(x => x.disabled = true);
        }
    })   
}

function verifyTurn(click){
    let turn = [];
    turn[0] = click % 2 === 0 ? "Jugador 1" : "Jugador 2";
    turn[1] = turn[0] === "Jugador 1" ? "./assets/circle.png" : "./assets/cross.png";
    return turn;
}

function verifyPos(){
    let board = 
    ["","","",
     "","","",
     "","",""
    ]
    let childs_1 = row_1.children;
    let childs_2 = row_2.children;
    let childs_3 = row_3.children;

    row1(childs_1, board);
    row2(childs_2, board);
    row3(childs_3, board);
    
    return board;
}

function row1(row, board){
    for(let i = 0; i <=2; i++){
        let button = row[i];
        if(button.classList.contains("hasMark")){
            if(button.firstElementChild.getAttribute('src') === "./assets/cross.png"){
                board[i] = "X";
            }else if (button.firstElementChild.getAttribute('src') === "./assets/circle.png"){
                board[i] = "O";
            }
        }
    }
}

function row2(row, board){
    for(let i = 3; i <=5; i++){
        let button = row[i-3];
        if(button.classList.contains("hasMark")){
            if(button.firstElementChild.getAttribute('src') === "./assets/cross.png"){
                board[i] = "X";
            }else if (button.firstElementChild.getAttribute('src') === "./assets/circle.png"){
                board[i] = "O";
            }
        }
    }
}

function row3(row, board){
    for(let i = 6; i <=8; i++){
        let button = row[i-6];
        if(button.classList.contains("hasMark")){
            if(button.firstElementChild.getAttribute('src') === "./assets/cross.png"){
                board[i] = "X";  
            }else if (button.firstElementChild.getAttribute('src') === "./assets/circle.png"){
                board[i] = "O";
            }
        }
    }
}

function verifyWin(board){
    const PLAYER1_VICTORY = "<b>El jugador 1 ha ganado!</b>";
    const PLAYER2_VICTORY = "<b>El jugador 2 ha ganado!</b>";

    if(board[0]==="X" && board[1] ==="X" && board[2] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[3]==="X" && board[4] ==="X" && board[5] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[6]==="X" && board[7] ==="X" && board[8] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[0]==="X" && board[3] ==="X" && board[6] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[1]==="X" && board[4] ==="X" && board[7] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[2]==="X" && board[5] ==="X" && board[8] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[0]==="X" && board[4] ==="X" && board[8] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    else if(board[2]==="X" && board[4] ==="X" && board[6] === "X") LOG.innerHTML = PLAYER1_VICTORY;
    
    if(board[3]==="O" && board[4] ==="O" && board[5] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[0]==="O" && board[1] ==="O" && board[2] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[6]==="O" && board[7] ==="O" && board[8] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[0]==="O" && board[3] ==="O" && board[6] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[1]==="O" && board[4] ==="O" && board[7] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[2]==="O" && board[5] ==="O" && board[8] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[0]==="O" && board[4] ==="O" && board[8] === "O") LOG.innerHTML = PLAYER2_VICTORY;
    else if(board[2]==="O" && board[4] ==="O" && board[6] === "O") LOG.innerHTML = PLAYER2_VICTORY;
}

function verifyTie(){
    let numberOfMarkedButtons=0;
    for(button of buttons){
        if(button.classList.contains("hasMark")){
            numberOfMarkedButtons+=1;
        }
        if(numberOfMarkedButtons === 9){
            LOG.innerHTML ="<b>Empate!</b>";
        }
    }
}