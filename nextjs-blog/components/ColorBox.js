import React from 'react';

const ColorBox = ({ color, onClick }) => {
  return (
    <div
      className="color-box"
      style={{
        backgroundColor: color,
        width: '75px',
        height: '75px',
        margin: '10px',
        cursor: 'pointer'
      }}
      onClick={onClick ? () => onClick(color) : null}
    ></div>
  );
};

export default ColorBox;
