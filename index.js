const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; //will be array
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// create a function to initialise game
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //empty boxes on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
        //boxes[index].classList.remove("win");
        //box.classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;

    //initialise boxes with css properties again


}

initGame();

function handleClick(index) {
    if (gameGrid[index] === "") {
        console.log(gameGrid[index] + index);


        //apply different color to X and 0
        //to display on UI
        boxes[index].innerText = currentPlayer;

        //to add in our defined aray to check status of game
        gameGrid[index] = currentPlayer;

        // updating cursor style 
        boxes[index].style.pointerEvents = "none";
        //swappiing the turn
        swapTurn();


        //checking if someone wins or not
        checkGameOver();

    }
}



function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
        console.log(currentPlayer + "If");
    }
    else {
        currentPlayer = "X";

        console.log(currentPlayer + "Else");
    }

    console.log(currentPlayer + "out");
    //updating UI
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}


//event listener on all boxes

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);

    })
})


//event listener for new game buttn
newGameBtn.addEventListener("click", initGame);