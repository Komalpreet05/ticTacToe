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
        //box.classList = `box box${index + 1}`; //or
        boxes[index].classList.remove("win"); //or
        //box.classList.remove("win"); //or
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

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        //all three boxes non empty and same value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            //check if winner is X
            if (gameGrid[position[0]] === 'X') {
                answer = 'X';
            }
            else {
                answer = '0';
            }

            //disable pointer as we got winner
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            //double check why not for loop
            //now we know X or 0 winner
            for (let i = 0; i < position.length; i++) {
                boxes[position[i]].classList.add("win");
            }

            // or 
            // boxes[position[0]].classList.add("win");
            // boxes[position[1]].classList.add("win");
            // boxes[position[2]].classList.add("win");
        }
    })

    //it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
    }

    //when no winner or there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    //board is filled then fill count will be nine
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
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