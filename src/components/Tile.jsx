import React from 'react';
import './Tile.css';
const Tile = ({ tile, onClick }) => {
  const { row, col, isStart, isEnd, isPath } = tile;
  const classNames = [
    'tile',
    isStart ? 'start' : '',
    isEnd ? 'end' : '',
    isPath ? 'path' : ''
  ].join(' ');
  return (
    <div className={classNames} onClick={onClick}></div>
  );
};
export default Tile;