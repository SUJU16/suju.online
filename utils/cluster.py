GUI=False
import sys
import random
import json
import math
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

if '--gui' in sys.argv:
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d import Axes3D
    GUI=True
    del sys.argv[sys.argv.index('--gui')]

random.seed(1234567890)

def dist(x,y):
    lat1 = x[0]
    lon1 = x[1]
    lat2 = y[0]
    lon2 = y[1]

    radius = 6371e3
    dLat = math.radians(lat1) - math.radians(lat2)
    dLon = math.radians(lon1) - math.radians(lon2)
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radius * c
    dt = x[2] - y[2]

    return math.sqrt(d*d+dt*dt)

#print(dist(np.array([60.169573, 24.935044]), np.array([60.171218,24.941477])))

if GUI:
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

timeScale = float(1)/(15*60)*1
coords = np.array([])
if len(sys.argv) > 1:
    coords = np.array([[float(x["latitude"]), float(x["longitude"]),float(x["date"])*timeScale, x["id"]]
        for x in json.loads(sys.argv[1])])
else:
    coords = []
    for i in range(random.randint(5,15)):
        center = [random.uniform(60.160, 60.170), random.uniform(24.930, 24.940)]
        for j in range(random.randint(1,12)):
            coords.append([center[0] + np.random.normal(0, 0.002), 
                center[1] + np.random.normal(0, 0.002), np.random.randint(100000,100500), len(coords)])
    
    coords = np.array(coords)

clusters = [{'id': 0, 'coords': coords}]
kissa = False
initDist = 250
asd = []
maxRecursion = 10
count = 0
while not kissa:
    koira = True
    for i in xrange(len(clusters) - 1, -1, -1):
        if count == 0 or len(clusters[i]["coords"]) > 12:
            d = DBSCAN(eps=initDist, min_samples=2, metric=dist)
            d.fit(clusters[i]["coords"])
            n_clusters = len(set(d.labels_)) - (1 if -1 in d.labels_ else 0)
            length = len(clusters) 
            for j in range(n_clusters):
                clusters.append({'id':0, 'coords': []})

            for j in range(len(d.labels_)):
                if d.labels_[j] < 0:
                    asd.append(clusters[i]["coords"][j])
                    continue
                index = len(clusters)+d.labels_[j]
                clusters[length+d.labels_[j]]["coords"].append(
                    clusters[i]["coords"][j])
            del clusters[i]
   

    initDist = initDist * 0.8
    for i in range(len(clusters)):
        if len(clusters[i]["coords"]) > 12:
            koira = False
            break

    count += 1
    if count >= maxRecursion:
        break
    kissa=koira

for i in clusters:
    for j in range(len(i["coords"])):
        i["coords"][j][2] *= (float(1)/timeScale)

for i in range(len(asd)):
    asd[2] *= (float(1)/timeScale)

if GUI:
    colors = plt.cm.Spectral(np.linspace(0,1,len(clusters)))
    for i in range(len(clusters)):
        c = colors[i]
        for j in range(len(clusters[i]["coords"])):
            coord = clusters[i]["coords"][j]
            ax.scatter(coord[0], coord[1], coord[2], marker='o',
                c=c, s=500)
#    for i in range(len(asd)):
#        ax.scatter(asd[i][0], asd[i][1], asd[i][2], marker='o', c='black', s=500)

jsonClusters = []
jsonPoints = []
for i in range(len(clusters)):
    points = clusters[i]["coords"]
    mean = np.array(points).mean(axis=0)

    maxdist = 0
    for j in points:
        maxdist = max(maxdist, dist([j[0], j[1], 1], [mean[0], mean[1], 1]))

    radius = maxdist
    [jsonPoints.append({'id': int(x[3]), 'cluster_id': i, 'latitude': x[0], 'longitude': x[1]}) for x in points]
    cluster = {'id': i, 'n_points': len(points), 'date': mean[2],
        'latitude': mean[0], 'longitude': mean[1],
        'radius': radius}
    

    if GUI:
        ax.scatter(mean[0], mean[1], mean[2], marker='x', c='black', s=500)
    jsonClusters.append(cluster)


print(json.dumps({'clusters': jsonClusters, 'points': jsonPoints}, sort_keys=True))
if GUI:
    plt.show()
