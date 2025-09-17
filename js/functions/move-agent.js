function moveAgent(x, y) {
    drawGrid();
    createGoal(goal[0], goal[1]);
    drawExplored();
    ctx.fillStyle = "red";
    ctx.fillRect(y*cell_size, x*cell_size, cell_size, cell_size);
    // DRAW LINE ON NEW CANVAS
    newctx.fillStyle = "white";
    newctx.fillRect(0, 0, newctx.canvas.width, newctx.canvas.height);
    newctx.strokeStyle = "red";
    newctx.lineWidth = 2;
    newctx.beginPath();
    newctx.moveTo(cell_size/2, cell_size/2);
    // DRAW LINES TO ALL EXPLORED CELLS
    for (let i = 0; i < exploredCells.length; i++) {
        // PICK THE COORDINATES OF THE INDIVIDUAL CELL
        const [ex, ey] = exploredCells[i];
        // DRAW LINE TO THE CENTER OF THE CELL
        newctx.lineTo(ey*cell_size + cell_size/2, ex*cell_size + cell_size/2);
    }
    // DRAW LINE TO CURRENT AGENT POSITION
    newctx.lineTo(y*cell_size + cell_size/2, x*cell_size + cell_size/2);
    newctx.stroke(); 

}