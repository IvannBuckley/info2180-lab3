document.addEventListener("DOMContentLoaded", function () {
  // Get the game elements
  const squares = document.querySelectorAll(".square");
  const status = document.getElementById("status");
  const newGameButton = document.getElementById("new-game");

  // Initialize game state
  let currentPlayer = "X"; // Start with player X
  let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the game board

  // Function to handle square clicks
  function handleSquareClick(event) {
    const square = event.target;
    const index = Array.from(squares).indexOf(square);

    // Check if the square is empty and game is not won
    if (gameBoard[index] === "" && !status.classList.contains("you-won")) {
      gameBoard[index] = currentPlayer; // Update game board
      square.classList.add(currentPlayer);
      square.textContent = currentPlayer;

      if (checkForWin()) {
        // Check for a win
        status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        status.classList.add("you-won");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
        status.textContent = `Current Player: ${currentPlayer}`;
      }
    }
  }

  // Function to reset the game
  function resetGame() {
    squares.forEach((square, index) => {
      square.classList.remove("X", "O");
      square.textContent = "";
      gameBoard[index] = "";
    });

    status.textContent = "Current Player: X";
    status.classList.remove("you-won");
    currentPlayer = "X";
  }

  // Function to check for a win
  function checkForWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
        return true;
      }
    }
    return false;
  }

  // Add event listeners to the squares
  squares.forEach(square => {
    square.addEventListener("click", handleSquareClick);
    square.addEventListener("mouseenter", () => square.classList.add("hover"));
    square.addEventListener("mouseleave", () => square.classList.remove("hover"));
  });

  // Add an event listener to the New Game button
  newGameButton.addEventListener("click", resetGame);

  // Initial status message
  status.textContent = "Current Player: X";
});
