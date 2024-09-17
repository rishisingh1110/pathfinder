function astar(grid, start, end) {
    const openSet = [];
    const closedSet = [];
    openSet.push(start);
    const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    const findNeighbors = (tile) => {
      const neighbors = [];
      const { row, col } = tile;
      if (row > 0) neighbors.push(grid[row - 1][col]);
      if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
      if (col > 0) neighbors.push(grid[row][col - 1]);
      if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
      return neighbors;
    };
    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      const current = openSet[lowestIndex];
      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = current;
        while (temp.previous) {
          path.push(temp);
          temp = temp.previous;
        }
        return path;
      }
      openSet.splice(lowestIndex, 1);
      closedSet.push(current);
      const neighbors = findNeighbors(current);
      for (let neighbor of neighbors) {
        if (closedSet.includes(neighbor)) {
          continue;
        }
        const tentativeG = current.g + 1;
        let newPath = false;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          newPath = true;
        } else if (tentativeG < neighbor.g) {
          newPath = true;
        }
        if (newPath) {
          neighbor.g = tentativeG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
    return null; // No path found
  }
  export default astar;