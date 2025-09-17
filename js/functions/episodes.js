async function runEpisodes() {
    for (let episode=0; episode<num_episodes; episode++) {
        // goal = [Math.floor(Math.random()*grid_size), Math.floor(Math.random()*grid_size)];
        exploredCells = []; 
        console.log(`Episode ${episode+1} GOAL: ${goal} | EPSILON: ${epsilon.toFixed(2)}`);
        
        let state = [0,0];
        let done = false;

        while (!done) {
            moveAgent(state[0], state[1]);
            markExplored(state[0], state[1]);
            const distance = Math.abs(state[0]-goal[0]) + Math.abs(state[1]-goal[1]);
            document.getElementById("episodeInfo").innerText = "Episode: " + (episode + 1) + ", Epsilon: " + epsilon.toFixed(2) + ", Distance to Goal: " + distance;



            let action = chooseAction(state);
            let [next_state, reward] = step(state, action);

            let max_next_q = Math.max(
                Q_table[[next_state[0], next_state[1], 0]],
                Q_table[[next_state[0], next_state[1], 1]],
                Q_table[[next_state[0], next_state[1], 2]],
                Q_table[[next_state[0], next_state[1], 3]]
            );

            Q_table[[state[0], state[1], action]] += alpha * (reward + gamma*max_next_q - Q_table[[state[0], state[1], action]]);
            state = next_state;

            epsilon = Math.max(0.1, epsilon*0.99);

            if (state[0] === goal[0] && state[1] === goal[1]) {
                console.log("Reached goal!");
                done = true;
            }

            await new Promise(r => setTimeout(r, 100)); 
        }
    }
}