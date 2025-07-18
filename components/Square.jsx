import React from "react";

const Square = ({ value, onSquareClick, isDisabled, otherStyles }) => {
  return (
    <button
      onClick={onSquareClick}
      disabled={isDisabled}
      className={`square ${otherStyles}`}
    >
      {value}
    </button>
  );
};

export default Square;
