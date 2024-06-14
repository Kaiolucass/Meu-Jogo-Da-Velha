const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const WinningMenssgeTextElement = document.querySelector("[data-winning-menssge-text]")
const WinningMenssge = document.querySelector("[data-winning-menssge]")
const restartButtom = document.querySelector("[data-restart-buttom]")

let isCircleTurn;

const winning=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] 

const startGame = () =>{
    isCircleTurn = false;

    for(const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("X");
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click", handleClick,{ once: true} );
    }
    setBoardHoverClass()   
    WinningMenssge.classList.remove("mostrar-winning-menssge") 
};

const endGame = (draw) =>{
    if (draw){
        WinningMenssgeTextElement.innerText = 'Deu Velha!'
    } else{
        WinningMenssgeTextElement.innerText = isCircleTurn ? 'O Venceu!': 'X Venceu!'
    }
    WinningMenssge.classList.add("mostrar-winning-menssge")
}


const chekForWin = (currentPlayer) =>{
    return winning.some(combination =>{
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkEmpate = () => {
    return[...cellElements].every(cell=>{
        return cell.classList.contains('X') || cell.classList.contains('circle')
    })
}

const placeMark = (cell,classToAdd)=>{
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () =>{
    board.classList.remove('circle')
    board.classList.remove('X')

    if (isCircleTurn){
        board.classList.add('circle')
    }else{
        board.classList.add('X')
    }
}
const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;
   setBoardHoverClass();
};
const handleClick = (e) => {
    // colocar a marca X ou O
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle":"X";

    placeMark(cell, classToAdd)
    // verificar vitoria
    const isWin = chekForWin(classToAdd)
    // verificar empate
    const isDraw = checkEmpate();
    if(isWin){
        endGame(false)
    }else if (isDraw){
        endGame(true)
    } else {
        // mudar simbolo
        swapTurns();
    }
    

   
};
    startGame();

restartButtom.addEventListener('click',startGame)