function step(state, action) {
    let x = state[0];
    let y = state[1];

    if (action === 0) x = Math.max(0, x-1);      // UP
    else if (action === 1) x = Math.min(grid_size-1, x+1); // DOWN
    else if (action === 2) y = Math.max(0, y-1); // LEFT
    else y = Math.min(grid_size-1, y+1);         // RIGHT

    let next_state = [x, y];
    let reward = (x === goal[0] && y === goal[1]) ? 10 : -1;
    return [next_state, reward];
}
