import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
function App() {
  const [startTile, setStartTile] = useState(null);
  const [endTile, setEndTile] = useState(null);
  
  const handleTileClick = (row, col) => {
    if (!startTile) {
      setStartTile({ row, col });
    } else if (!endTile) {
      setEndTile({ row, col });
    }
  };
  
  
  return (
    <div className="App">
      <h1>Pathfinding Visualizer</h1>
      <p>Pls refresh page to reset grid</p>
      <Grid
        startTile={startTile}
        endTile={endTile}
        onTileClick={handleTileClick}
      />
     
    </div>
  );
}
export default App;