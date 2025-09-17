function chooseAction(state) {
    let x = state[0];
    let y = state[1];
    let gx = goal[0], gy = goal[1];

    let action_values = [];
    for (let a=0; a<4; a++) {
        let nx=x, ny=y;
        if (a===0) nx=Math.max(0, x-1);
        else if (a===1) nx=Math.min(grid_size-1, x+1);
        else if (a===2) ny=Math.max(0, y-1);
        else ny=Math.min(grid_size-1, y+1);
        
        // DISTANCE TO GOAL
        let dist = Math.abs(nx-gx) + Math.abs(ny-gy);
        // PREFER ACTIONS THAT REDUCE DISTANCE TO GOAL
        action_values.push(-dist);
    }

    if (Math.random() < epsilon) return Math.floor(Math.random()*4);

    let best_action = 0;
    let best_value = Q_table[[x,y,0]] + action_values[0];
    for (let a=1; a<4; a++) {
        let value = Q_table[[x,y,a]] + action_values[a];
        if (value > best_value) {
            best_value = value;
            best_action = a;
        }
    }
    return best_action;
}