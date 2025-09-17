function moveAgent(x, y) {
    drawGrid();
    createGoal(goal[0], goal[1]);
    drawExplored();
    ctx.fillStyle = "red";
    ctx.fillRect(y*cell_size, x*cell_size, cell_size, cell_size);

}