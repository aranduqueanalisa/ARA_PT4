// Initialize score and timer
let score = 0;
let timeLeft = 60; // Time limit in seconds

// Set up drag and drop event listeners
const boxes = document.querySelectorAll(".box");
const droppables = document.querySelectorAll(".droppable");
const remarks = document.getElementById("remarks");
const scoreDisplay = document.getElementById("scores");
const timerDisplay = document.getElementById("timer");

// Timer function
function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = `${timeLeft} seconds`;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End game function
function endGame() {
    remarks.textContent = "Time's up!";
    boxes.forEach(box => box.setAttribute("draggable", false)); // Disable further dragging
}

// Update score
function updateScore() {
    scoreDisplay.textContent = `${score}`;
    if (score === 10) {
        remarks.textContent = "Congratulations! You matched all numbers!";
    }
}

// Drag and Drop Handlers
boxes.forEach(box => {
    box.addEventListener("dragstart", dragStart);
});

droppables.forEach(droppable => {
    droppable.addEventListener("dragover", dragOver);
    droppable.addEventListener("drop", drop);
});

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const boxId = e.dataTransfer.getData("text");
    const draggedBox = document.getElementById(boxId);

    if (e.target.getAttribute("data-draggable-id") === boxId) {
        e.target.appendChild(draggedBox);
        score++;
        updateScore();
    } else {
        remarks.textContent = "Incorrect match. Try again!";
    }
}

// Start game timer
startTimer();
updateScore();