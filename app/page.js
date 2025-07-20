"use client";

import Square from "@/components/Square";
import React, { useState } from "react";

const page = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const { player: winner, line: winningLine } = determineWinner(squares);

  const handleSquareClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext((prev) => !prev);
  };

  
  let status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;

  function determineWinner(squaresArray) {
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (let i = 0; i < winPatterns.length; i++) {
      // Destructure current win combo into 3 varaibles
      const [a, b, c] = winPatterns[i];

      // Check for a win
      if (
        squaresArray[a] &&
        squaresArray[a] === squaresArray[b] &&
        squaresArray[a] === squaresArray[c]
      ) {
        return { player: squaresArray[a], line: winPatterns[i] };
      }
    }
    return { player: null, line: [] };
  }

  function checkForDraw() {
    let counter = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== null) counter++;
    }
    if (counter !== 9) return false;
    return true;
  }

  const isDraw = checkForDraw();

  return (
    <div className="flex__center h-screen">
      <div className="board">
        <div>{status}</div>
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const idx = row * 3 + col;
              const highlight = winningLine.includes(idx) ? "bg-teal-500 text-white" : "";
              return (
                <Square
                  key={idx}
                  value={squares[idx]}
                  onSquareClick={() => handleSquareClick(idx)}
                  otherStyles={highlight}
                />
              );
            })}
          </div>
        ))}

        <div className="reset-btn mt-5">
          {(winner || isDraw) && (
            <button
              className="bg-slate-800 text-white w-full rounded-sm p-2 cursor-pointer"
              onClick={() => setSquares(Array(9).fill(null))}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
