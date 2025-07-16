"use client";

import Square from "@/components/Square";
import { useState } from "react";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  /**
   * Handles a click on square at index i.
   * Returns early if that square is filled or if there's already a winner.
   */
  const handleSquareClick = (i) => {
    if (squares[i] || determineWinner(squares)) {
      return; // ignore clicks on occupied squares or after game end
    }

    // 
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(prev => !prev); // Toggle
  }

  // Determine if there's a winner based on current board
  const winner = determineWinner(squares);
  let status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`;

  /**
   * Checks all winning patterns for a 3×3 Tic‑Tac‑Toe board.
   * Returns 'X' or 'O' if a winning line is found, otherwise null.
   */
  function determineWinner(squaresArray) {
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Patterns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6]
    ];

    // Iterate over all possible win patterns
    for (let i = 0; i < winPatterns.length; i++) {
      // Array destructuring
      const [a, b, c] = winPatterns[i];

      // Check if all three squares are the same non-null value
      if (squaresArray[a] && squaresArray[a] === squaresArray[b] && squaresArray[a] === squaresArray[c]) {
        return squaresArray[a];
      }
    }
    return null;
  }

  return (
    <div className="flex-1 h-screen flex items-center justify-center">
      <div className="board">
        <div className="">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
        </div>
      </div>
    </div>
  );
}
