#%%
import numpy as np
from colaborative_recomender import ColaborativeRecomender
from visualize import plot_cost
import pandas as pd

#%%
ratings1 = np.array([
    [2, 2],
    [1, -1],
    [0, -1],
    [-1, -1],
    ])

ratings = np.array([
    [5, 5, 0, 0],
    [5, -1, -1, 0],
    [-1, 4, 0, -1],
    [0, 0, 5, -1]
    ])

R = (ratings != -1).astype(np.float32)

#%%
cr = ColaborativeRecomender(ratings, 5, 0.01, 0)

print(ratings)
print(cr.cost())
cr.fit(1000)
print(np.round(cr.predict()))
print(cr.predict())
print(cr.cost())
plot_cost(cr.errors)

#%%
