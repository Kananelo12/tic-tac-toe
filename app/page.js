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
    if (squares[i] || winner) {
      return; // ignore clicks on occupied squares or after game end
    }

    // Avoid mutating original array
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext((prev) => !prev); // Toggle turn to next player
  };

  const isDraw = () => {
    let counter = 0;
    for (let i = 0; i < squares.length; i++) {
      console.log("Square Value " + squares[i]);
      if (squares[i] !== null) {
        counter++;
      }
    }
    if (counter !== 9) return false;
    return true;
  };

  const draw = isDraw();

  // Determine if there's a winner based on current board
  const { player: winner, line: winningLine } = determineWinner(squares);

  // let status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`;

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
      [2, 4, 6],
    ];

    // Iterate over all possible win patterns
    for (let i = 0; i < winPatterns.length; i++) {
      // Array destructuring
      const [a, b, c] = winPatterns[i];

      // Check if all three squares are the same non-null value
      if (
        squaresArray[a] &&
        squaresArray[a] === squaresArray[b] &&
        squaresArray[a] === squaresArray[c]
      ) {
        // return both the winner and their winning combo
        return { player: squaresArray[a], line: winPatterns[i] };
      }
    }
    return { player: null, line: [] };
  }

  return (
    <div className="flex-1 h-screen flex items-center justify-center">
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const idx = row * 3 + col;
              const highlight = winningLine.includes(idx) ? "bg-teal-500" : "";
              return (
                <Square
                  key={idx}
                  value={squares[idx]}
                  onSquareClick={() => handleSquareClick(idx)}
                  isDisabled={winner}
                  otherStyles={highlight}
                />
              );
            })}
          </div>
        ))}

        <div className="player w-full flex__center mt-3">
          <div className="flex justify-center shadow rounded-full mt-4 border border-gray-100">
            <div
              className={`flex__center w-[40px] h-[40px] rounded-full ${
                isXNext
                  ? "bg-teal-500 text-white" 
                  : "text-gray-600"
              }`}
            >
              X
            </div>
            <div
              className={`flex__center w-[40px] h-[40px] rounded-full ${
                !isXNext
                  ? "bg-teal-500 text-white"
                  : "text-gray-600"
              }`}
            >
              O
            </div>
          </div>
        </div>

        <div className="reset-btn">
          {(winner || draw) && (
            <button
              className="bg-slate-800 text-white w-full rounded-sm mt-5 p-2 cursor-pointer"
              onClick={() => setSquares(Array(9).fill(null))}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
