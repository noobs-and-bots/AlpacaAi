import numpy as np
import matplotlib.pyplot as plt


def plot_cost(errors):
    plt.plot(errors)
    plt.title("Cost for every iteration")
    plt.xlabel("iteration")
    plt.ylabel("Cost (J(theta))")
    plt.show()