"use client";

import React from "react";

const Square = ({ value, onSquareClick, otherStyles }) => {
  return (
    <button onClick={onSquareClick} className={`square ${otherStyles}`}>
      {value}
    </button>
  );
};

export default Square;
