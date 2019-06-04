#%%
import numpy as np
from .colaborative_recomender import ColaborativeRecomender, CRInterface
from .visualize import plot_cost
import pandas as pd

def map_to_ids(column, idx):
    idd = 0
    ids = {}
    for _, v in column.iterrows():
        if v[idx] in ids:
            continue
        else:
            ids[v[idx]] = idd
            idd += 1
    return ids

def train(anime_path, rating_path, train_level = 1, verbose_lvl = 0):
    if train_level == 1:
        Const = 500
        epochs = 500
    else:
        Const = 1000
        epochs = 1000
    anime = pd.read_csv(anime_path)
    ratings = pd.read_csv(rating_path)
    ratings = ratings[ratings['rating'] >= 5] #drop not rated animes
    ratings = ratings[ratings['user_id'] <= Const] #drop not rated animes
    # ratings = ratings.head(Const)
    if verbose_lvl > -1:
        anime_ids = map_to_ids(ratings, 'anime_id')
        ids_anime = {val:key for key, val in anime_ids.items()}
        users_ids = map_to_ids(ratings, 'user_id')
        ids_users = {val:key for key, val in users_ids.items()}

    X = np.zeros((len(anime_ids), len(users_ids))) - 1
    for index, row in ratings.iterrows():
        val = row['anime_id']
        val2 = row['user_id']
        X[anime_ids[val], users_ids[val2]] = row['rating']


    Y = np.array([
        [2, 2],
        [1, -1],
        [0, -1],
        [-1, -1],
        ])

    D = X

    cr = ColaborativeRecomender(D, 3, 0.0001, 0)
    if verbose_lvl > 0:
        print(cr.X, cr.Theta)
        print(D[:10])
        print(cr.cost())
    if verbose_lvl > -1:
        cr.fit(epochs, 0, 0.001)
    if verbose_lvl > 0:
        print(np.round(cr.true_predict())[:10])
        print(cr.cost())
        if verbose_lvl > 1:
            plot_cost(cr.errors)
        print(len(anime_ids))
        print(len(users_ids))
        print(ratings.shape)
        print(len(ratings['user_id'].unique().tolist()), 'unique users')
        print(len(ratings['anime_id'].unique().tolist()), 'unique animes')

    return CRInterface(cr, anime_ids, ids_anime, users_ids, ids_users)
