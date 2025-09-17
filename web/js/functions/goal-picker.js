function goal_picker(){
    // USE MOUSE TO PICK
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientY - rect.top;
        const y = event.clientX - rect.left;
        const cellX = Math.floor(x / cell_size);
        const cellY = Math.floor(y / cell_size);
        goal = [cellX, cellY];
        drawGrid();
        createGoal(goal[0], goal[1]);
        drawExplored();
        moveAgent(0, 0);
    });
}
