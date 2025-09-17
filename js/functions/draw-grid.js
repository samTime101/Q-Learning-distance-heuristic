function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    for (let i = 0; i <= grid_size; i++) {
        // HORIZONTAL LINES
        ctx.beginPath();
        ctx.moveTo(0, i*cell_size);
        ctx.lineTo(grid_size*cell_size, i*cell_size);
        ctx.stroke();
        // VERTICAL LINES
        ctx.beginPath();
        ctx.moveTo(i*cell_size, 0);
        ctx.lineTo(i*cell_size, grid_size*cell_size);
        ctx.stroke();
    }
}