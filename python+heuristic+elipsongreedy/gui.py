import random
import tkinter as tk
import time

grid_size = 10
cell_size = 60

window = tk.Tk()
canvas = tk.Canvas(window, width=grid_size*cell_size, height=grid_size*cell_size)
canvas.pack()

# GIRD LINES
for i in range(grid_size+1):
    canvas.create_line(0, i*cell_size, grid_size*cell_size, i*cell_size)
    canvas.create_line(i*cell_size, 0, i*cell_size, grid_size*cell_size)

# THE AGENT
agent_rect = canvas.create_rectangle(0, 0, cell_size, cell_size, fill='red')

# GOAL
def create_goal(x, y):
    canvas.delete("goal")
    canvas.create_rectangle(y*cell_size, x*cell_size, (y+1)*cell_size, (x+1)*cell_size, fill='green', tags="goal")

# MOVE AND UPDATE AGENT
def move_agent(x, y):
    canvas.coords(agent_rect, y*cell_size, x*cell_size, (y+1)*cell_size, (x+1)*cell_size)
    window.update()
    time.sleep(0.1)

# COLLECT EXPLORED CELLS
def mark_explored(x, y):
    canvas.create_rectangle(y*cell_size + cell_size//4, x*cell_size + cell_size//4,
                            y*cell_size + 3*cell_size//4, x*cell_size + 3*cell_size//4,
                            fill='blue', tags='explored')

# ALL Q-VALUES TO 0
Q_table = {}
for x in range(grid_size):
    for y in range(grid_size):
        for a in range(4):
            Q_table[((x,y), a)] = 0

alpha = 0.1
gamma = 0.9
epsilon = 0.5
num_episodes = 10


def step(state, action):
    global goal
    x, y = state
    if action == 0:      # UP
        x = max(0, x - 1)
    elif action == 1:    # DOWN
        x = min(grid_size - 1, x + 1)
    elif action == 2:    # LEFT
        y = max(0, y - 1)
    else:                # RIGHT
        y = min(grid_size - 1, y + 1)

    next_state = (x, y)
    reward = 10 if next_state == goal else -1
    return next_state, reward

# ACTION- ELIPSION-BASED WITH HEURISTIC
def choose_action(state):
    global goal
    x, y = state
    gx, gy = goal
    action_values = []

    for a in [0,1,2,3]:
        if a == 0: nx, ny = max(0, x-1), y
        elif a == 1: nx, ny = min(grid_size-1, x+1), y
        elif a == 2: nx, ny = x, max(0, y-1)
        else: nx, ny = x, min(grid_size-1, y+1)

        dist = abs(nx - gx) + abs(ny - gy)
        action_values.append(-dist)

    if random.random() < epsilon:
        return random.choice([0,1,2,3])
    else:
        # RETURN THE ACTION WITH MAX Q-VALUE PLUS HEURISTIC
        return max([0,1,2,3], key=lambda a: Q_table[(state, a)] + action_values[a])

for episode in range(num_episodes):
    goal = (random.randint(0, grid_size-1), random.randint(0, grid_size-1))
    create_goal(*goal)
    print(f"Episode {episode+1} GOAL: {goal} | EPSILON: {epsilon:.2f}")

    state = (0,0)
    done = False

    while not done:
        action = choose_action(state)
        move_agent(*state)
        mark_explored(*state)

        next_state, reward = step(state, action)
        max_next_q = max([Q_table[(next_state, a)] for a in [0,1,2,3]])
        Q_table[(state, action)] += alpha * (reward + gamma * max_next_q - Q_table[(state, action)])
        state = next_state

        epsilon = max(0.1, epsilon * 0.99)

        if state == goal:
            canvas.delete("explored")
            print(f"Reached goal!")
            done = True
