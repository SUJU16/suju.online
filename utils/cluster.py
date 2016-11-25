import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import random
import json
import sys

random.seed(1234567890)
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

coords = np.array([])
if len(sys.argv) > 1:
    coords = np.array([[x["latitude"],x["longitude"],x["date"]]
        for x in json.loads(sys.argv[1])])
else:
    coords = np.array([[random.uniform(60.160, 60.166), random.uniform(24.930, 24.938),
        random.randint(100000, 100500)] for x in range(30)])

s = StandardScaler()

coords = s.fit_transform(coords)

d = DBSCAN(eps=0.7, min_samples=3)
d.fit(coords)

n_clusters = len(set(d.labels_)) - (1 if -1 in d.labels_ else 0)
colors = plt.cm.Spectral(np.linspace(0,1,len(set(d.labels_))))

coords = s.inverse_transform(coords)
for i in range(len(coords)):
    c = colors[d.labels_[i]+1]
    ax.scatter(coords[i][0], coords[i][1], coords[i][2], marker='o',
        c=c, s=500)

clusters = []
for i in range(n_clusters):
    points = []
    for j in range(len(coords)):
        if d.labels_[j] == i:
            points.append(coords[j])

    points = np.array(points)
    mean = points.mean(axis=0)
    ax.scatter(mean[0], mean[1], mean[2], marker='x',
        c='black')
    c = {'latitude': mean[0], 'longitude': mean[1]}
    clusters.append({'location': c, 'n_points': len(points), 'date': mean[2]})

print(json.dumps(clusters, sort_keys=True))
#plt.show()
