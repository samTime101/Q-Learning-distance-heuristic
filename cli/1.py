# SAMIP REGMI
# OLD CODES -> FOR ARCHIVE ON GITHUB 
import random
import tkinter as tk
import time

grid_size = 5
cell_size = 60

Q_table = {}
grid_size = 5
goal = (grid_size-1, grid_size-1)
def initialize_Q_table():
    for x in range(grid_size):
        for y in range(grid_size):
            for a in range(4):  
                Q_table[((x,y), a)] = 0
    return Q_table

print(initialize_Q_table()) 

alpha = 0.1      
gamma = 0.9      
epsilon = 0.5    
num_episodes = 10

def step(state, action):
    x, y = state
    if action == 0:  
        x = max(0, x - 1)
    elif action == 1:  
        x = min(grid_size - 1, x + 1)
    elif action == 2:  
        y = max(0, y - 1)
    elif action == 3:  
        y = min(grid_size - 1, y + 1)
    next_state = (x, y)
    if next_state == goal:
        reward = 10
    elif next_state == state or next_state[0] < 0 or next_state[0] > grid_size - 1 or next_state[1] < 0 or next_state[1] > grid_size - 1:
        reward = -10
    else:
        reward = -1
    return next_state, reward


for episode in range(num_episodes):
    state = (0,0)
    actions = []
    done = False
    while not done:
        if random.random() < epsilon:
            action = random.choice([0,1,2,3])
        else:
            action = max([0,1,2,3], key=lambda a: Q_table[(state, a)])
        actions.append(action)
        next_state, reward = step(state, action)
        print("REWARD FOR ACTION", action, ":", reward)
        max_next_q = max([Q_table[(next_state, a)] for a in [0,1,2,3]])
        Q_table[(state, action)] = Q_table[(state, action)] + alpha * (reward + gamma * max_next_q - Q_table[(state, action)])
        state = next_state
        
        epsilon = max(0.1, epsilon * 0.99)
        if state == goal:
            print(f"EPISODE {episode+1}: REACHED GOAL")
            print(f"ACTIONS: {actions}")
            done = True

