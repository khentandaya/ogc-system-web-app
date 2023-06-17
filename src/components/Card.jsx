import React from "react";

function Card({ children, id, addClass }) {
  return (
    <div
      id={id}
      className={
        "relative px-4 py-6 border border-gray-100 bg-white rounded-lg shadow-lg w-full " +
        addClass
      }
    >
      {children}
    </div>
  );
}

export default Card;
