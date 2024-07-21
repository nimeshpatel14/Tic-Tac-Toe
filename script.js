// Welcome message
console.log("Welcome");

// Selecting buttons and message display area
let btn = document.querySelectorAll(".btn");
let msg = document.querySelector(".msg");
let turn = document.querySelector(".turn");

// Variables to track turns and count moves
let turnO = true;
let count = 0;

// Patterns for winning combinations
let winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to disable buttons
const disabledBtn = () => {
    for (let iterator of btn) {
        iterator.disabled = true;
    }
};

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = `Player '${winner}' has Won!`;
    msg.classList.remove("hide");
    turn.classList.add('hide');
    disabledBtn();
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winnerPattern) {
        let pos1val = btn[pattern[0]].innerText;
        let pos2val = btn[pattern[1]].innerText;
        let pos3val = btn[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

// Function to display draw message
const gameDraw = () => {
    msg.innerText = "Game ended in a draw!";
    msg.classList.remove("hide");
    turn.classList.add('hide');
    disabledBtn()
};

// Event listener for button clicks
Array.from(btn).forEach(e => {
    e.addEventListener('click', () => {
        navigator.vibrate(200);

        if (turnO) {
            e.innerText = "O";
            turnO = false;
            turn.innerText = "It's X's turn";
        } else {
            e.innerText = "X";
            turnO = true;
            turn.innerText = "It's O's turn";
        }
        e.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Function to enable buttons
function enableBtn() {
    for (let iterator of btn) {
        iterator.disabled = false;
    }
}

// Event listener for reset button
document.querySelector("#resetGame").addEventListener('click', () => {
    for (let iterator of btn) {
        iterator.innerText = " ";
    }
    msg.innerText = '';
    count = 0;
    msg.classList.add("hide");
    turn.classList.remove('hide');
    enableBtn();
});
