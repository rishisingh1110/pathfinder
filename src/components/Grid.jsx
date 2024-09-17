import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import astar from '../algorithms/astar';
import './Grid.css';
const Grid = ({ startTile, endTile, onTileClick }) => {
  const gridSize = 20;
  const [grid, setGrid] = useState([]);
  
  useEffect(() => {
    const newGrid = Array.from({ length: gridSize }, (_, row) =>
      Array.from({ length: gridSize }, (_, col) => ({
        row,
        col,
        isStart: false,
        isEnd: false,
        isPath: false,
      }))
    );
    setGrid(newGrid);
  }, []); 
  useEffect(() => {
    if (startTile || endTile) {
      const newGrid = grid.map((row) =>
        row.map((tile) => ({
          ...tile,
          isStart: startTile && startTile.row === tile.row && startTile.col === tile.col,
          isEnd: endTile && endTile.row === tile.row && endTile.col === tile.col,
          isPath: false, 
        }))
      );
      setGrid(newGrid);
    }
  }, [startTile, endTile]); 
  useEffect(() => {
    if (startTile && endTile) {
      const path = astar(grid, startTile, endTile);
      if (path) {
        const newGrid = grid.map((row) =>
          row.map((tile) => {
            const isInPath = path.find(p => p.row === tile.row && p.col === tile.col);
            return { ...tile, isPath: !!isInPath };
          })
        );
        setGrid(newGrid);
      }
    }
  }, [startTile, endTile]);
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tile, tileIndex) => (
            <Tile
              key={tileIndex}
              tile={tile}
              onClick={() => onTileClick(tile.row, tile.col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Grid;