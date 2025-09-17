const grid_size = 10;
const cell_size = canvas.width / grid_size;
let goal = [Math.floor(Math.random()*grid_size), Math.floor(Math.random()*grid_size)];
let Q_table = {};
let alpha = 0.1;
let gamma = 0.9;
let epsilon = 0.5;
let num_episodes = 50;


