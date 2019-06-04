import numpy as np
from tqdm import trange

class BadGDException(Exception):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class ColaborativeRecomender:

    def __init__(self, ratings, n_params, learning_rate, reg_par):
        self.ratings = np.copy(ratings) / 10
        self.M = (ratings != -1).astype(np.float32)
        self.masked_ratings = np.ma.array(ratings, mask=(self.M != 1))
        self.mu = np.mean(self.masked_ratings, 1) #mean of rows
        self.rn_state = np.random.RandomState(seed=0)
        self.n = n_params #number of features
        self.m, self.u = ratings.shape #number of movies and users
        self.X = np.random.rand(self.m, n_params)
        self.Theta = np.random.rand(self.u, n_params)

        self.learning_rate = learning_rate
        self.reg_par = reg_par
        self.errors = []

    def predict(self):
        return self.X @ self.Theta.T

    def true_predict(self):
        P = self.predict() * 10
        P[P > 10] = 10
        P[P < 0] = 0
        return P

    def grad(self):
        diff = (self.predict() - self.ratings) * self.M
        X_grad = diff @ self.Theta + self.reg_par * self.X
        Theta_grad = diff.T @ self.X + self.reg_par * self.Theta
        return 1/2 * np.sum(diff ** 2), X_grad, Theta_grad

    def cost(self):
        c, _, _ = self.grad()
        return c

    def fit(self, num_epochs, eps = 0.001, momentum = 0.1):
        last_cost = None
        last_X = np.zeros(self.X.shape)
        last_T = np.zeros(self.Theta.shape)
        for i in trange(num_epochs, desc = 'GD:'):
            cost, x_grad, theta_grad = self.grad()
            self.X -= (self.learning_rate * x_grad + last_X * momentum)
            self.Theta -= (self.learning_rate * theta_grad + last_T * momentum)
            self.errors.append(cost)
            if last_cost is not None and cost > last_cost:
                print("Cost is greater than in the last iteration!")
                # raise BadGDException("GD failed after {} iterations".format(i))
            last_cost = cost
            last_X = x_grad
            last_T = theta_grad
