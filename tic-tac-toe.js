document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll(".square");
    const status = document.getElementById("status");
    const newGameButton = document.getElementById("new-game");
  
    let currentPlayer = "X"; // Initialize the first player as X
    let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Initialize the game board state
  
    // Function to update the square when clicked
    function handleSquareClick(event) {
      const square = event.target;
      const index = Array.from(squares).indexOf(square);
  
      if (gameBoard[index] === "" && !status.classList.contains("you-won")) {
        gameBoard[index] = currentPlayer;
        square.classList.add(currentPlayer);
        square.textContent = currentPlayer;
  
        // Check for a win
        if (checkForWin()) {
          status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          status.classList.add("you-won");
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch to the other player
          status.textContent = `Current Player: ${currentPlayer}`;
        }
      }
    }
  
    // Function to reset the game
    function resetGame() {
      for (let i = 0; i < gameBoard.length; i++) {
        squares[i].classList.remove("X", "O");
        squares[i].textContent = "";
        gameBoard[i] = "";
      }
      status.textContent = "Current Player: X";
      status.classList.remove("you-won");
      currentPlayer = "X";
    }
  
    // Function to check for a win
    function checkForWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
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
    squares.forEach((square) => {
      square.addEventListener("click", handleSquareClick);
      square.addEventListener("mouseenter", () => square.classList.add("hover"));
      square.addEventListener("mouseleave", () => square.classList.remove("hover"));
    });
  
    // Add an event listener to the New Game button
    newGameButton.addEventListener("click", resetGame);
  
    // Initial status message
    status.textContent = "Current Player: X";
  });
  