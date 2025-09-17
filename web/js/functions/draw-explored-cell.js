let exploredCells = []; 
function markExplored(x, y) {
    exploredCells.push([x, y]);
}

function drawExplored() {
    ctx.fillStyle = "blue";
    for (let i = 0; i < exploredCells.length; i++) {
        const [x, y] = exploredCells[i];
        ctx.fillRect(y*cell_size + cell_size/4, x*cell_size + cell_size/4, cell_size/2, cell_size/2);
    }
}
