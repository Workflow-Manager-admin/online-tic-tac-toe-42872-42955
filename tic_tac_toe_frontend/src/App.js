import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main Tic-Tac-Toe app.
   * Provides two player (local) gameplay, handles win/draw logic, player turns, reset,
   * and features a modern, minimalistic, responsive UI with theme colors.
   */

  // Board is an array of 9 cells: '', 'X', or 'O'
  const [board, setBoard] = useState(Array(9).fill(''));
  // Current player: true for X, false for O
  const [isXNext, setIsXNext] = useState(true);
  // Winner: 'X', 'O', or null; draw: boolean
  const winner = calculateWinner(board);
  const draw = !winner && board.every(cell => cell);

  /**
   * Handles click on a cell.
   * @param {number} idx - The index of the clicked cell.
   */
  // PUBLIC_INTERFACE
  const handleClick = idx => {
    if (board[idx] || winner) return; // Cannot move if cell occupied or game over
    const newBoard = board.slice();
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  /**
   * Resets the game to the initial state.
   */
  // PUBLIC_INTERFACE
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
  };

  /** UI Computed Variables **/
  const currentPlayer = isXNext ? 'X' : 'O';

  // Dynamic status message
  let status;
  if (winner) {
    status = (
      <span className={winner === 'X' ? "text-primary" : "text-secondary"}>
        {winner === 'draw'
          ? "It's a Draw!"
          : `Player ${winner} wins!`}
      </span>
    );
  } else if (draw) {
    status = <span className="text-accent">It's a Draw!</span>;
  } else {
    status = (
      <>
        <span>Player </span>
        <span className={isXNext ? "text-primary" : "text-secondary"}>
          {currentPlayer}
        </span>
        <span>'s turn</span>
      </>
    );
  }

  return (
    <div className="App">
      <div className="ttt-main-container">
        {/* Header */}
        <header className="ttt-header">
          <h1 className="ttt-title">
            <span className="text-accent">Tic</span>
            <span className="mx-1 text-primary">Tac</span>
            <span className="text-secondary">Toe</span>
          </h1>
        </header>

        {/* Player Indicator / Status */}
        <div className="ttt-info">
          <div className="ttt-status">{status}</div>
        </div>

        {/* Game Board */}
        <div className="ttt-board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className={
                "ttt-cell" +
                (cell === 'X' ? " ttt-x" : cell === 'O' ? " ttt-o" : "") +
                (winner && (winner === cell) ? " ttt-win" : "")
              }
              aria-label={`${
                cell
                  ? `Cell ${idx + 1}: ${cell}`
                  : `Empty cell ${idx + 1}, click to place ${currentPlayer}`
              }`}
              onClick={() => handleClick(idx)}
              disabled={!!winner || !!cell}
            >
              {cell}
            </button>
          ))}
        </div>
        {/* Bottom Panel */}
        <div className="ttt-bottom-panel">
          <button className="ttt-reset-btn" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
      <footer className="ttt-footer">
        <span className="footer-note">
          Made with <span className="text-accent">React</span> | Two-player local
        </span>
      </footer>
    </div>
  );
}

/**
 * Checks for a winner on the board.
 * @param {Array<string>} squares - The board state.
 * @returns {"X"|"O"|null}
 */
function calculateWinner(squares) {
  // PUBLIC_INTERFACE
  /** Returns "X", "O" or null for no winner. */
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
export default App;
