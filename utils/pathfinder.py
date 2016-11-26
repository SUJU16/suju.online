from sets import Set
import googlemaps
from datetime import datetime
import json
import sys
import time
import os
from cachetools import LRUCache

key = os.environ['GMAP_API']
if not key:
	sys.stderr.write("Give API key")
	sys.exit(1)
gmaps = googlemaps.Client(key=key)

cache = LRUCache(maxsize=1024)

def log(s):
	pass
	#print(s)

def cost(time, count):
	#print(time, count)
	#print(1.0*time/(count*count))
	time = time/60.0
	return time/(count*count)

def timeDistance(p1, p2):
	global gmaps, cache
	#from math import sqrt, pow
	#return sqrt(pow(p1["latitude"] - p2["latitude"], 2) + pow(p1["longitude"] - p2["longitude"], 2))

	cacheKey = "%s %s" % (p1['location']['latitude'], p1['location']['longitude'])
	cacheKey = "%s %s %s" % (cacheKey, p2['location']['latitude'], p2['location']['longitude'])
	if cacheKey in cache:
		return cache[cacheKey]
	else:
		now = datetime.now()
		res = gmaps.directions("%s %s" % (p1['location']['latitude'], p1['location']['longitude']),
								"%s %s" % (p2['location']['latitude'], p2['location']['longitude']),
								mode="driving",
								departure_time=now
								)
		#log(res)
		#log("%s %s" % (p1['location']['latitude'], p1['location']['longitude']))
		#log("%s %s" % (p2['location']['latitude'], p2['location']['longitude']))
		try:
			time = res[0]['legs'][0]['duration_in_traffic']['value']
			cache[cacheKey] = time
			return time
		except:
			cache[cacheKey] = None
			return None

def sjuktra(stops, end):
	MAX_PEOPLE = 12
	TIMERANGE = 30*60

	unvisited = Set(range(len(stops)))
	unvisited.add("end")

	prev = dict()
	dist = dict()

	for i in unvisited:
		dist[i] = {"cost": 9999999999999999, "count": 0, "date": None}
		prev[i] = None

	dist['end'] = {"cost": 0, "count": 0, "date": None}

	while unvisited:
		# Find smallest unvisited vertex
		u_idx = None
		for i in unvisited:
			if u_idx == None or dist[i] < dist[u_idx]:
				u_idx = i

		u = stops[u_idx] if u_idx != "end" else end
		unvisited.remove(u_idx)

		log("Smallest: " + str(u_idx))

		for i in unvisited:
			i_count = stops[i]['n_points']
			i_time = stops[i]['date']
			current_count = dist[u_idx]['count']

			log("[%s] count: %s" % (str(i), str(i_count)))
			log("[%s] time: %s" % (str(i), str(i_time)))

			if dist[u_idx]['date'] != None and dist[u_idx]['date'] < i_time:
				log("> time") 
				continue

			if current_count >= 12:
				log("> count")
				continue

			t_time = timeDistance(u, stops[i])
			if not t_time:
				log("time err")
				continue

			log("Time to travell [%s-%s]: %i" % (str(u_idx), str(i), t_time))

			if dist[u_idx]['date'] == None:
				time = i_time + t_time
			else:
				time = dist[u_idx]['date'] + t_time

			free_space = 12 - current_count
			log("Free: %i" % free_space)
			
			take_count = min(i_count, free_space)
			count = current_count + take_count

			log("Time: %i" % time)
			log("Count: %i" % count)

			i_cost = dist[u_idx]['cost']*(current_count*current_count)/(count*count) + cost(t_time, count)
			#i_cost = cost(t_time, take_count)
			log("Cost: %i" % i_cost)

			if i_cost < dist[i]['cost'] and dist[u_idx]['count'] < MAX_PEOPLE and (abs(time - i_time) < TIMERANGE or dist[u_idx]['date'] == None):
				dist[i]['cost'] = i_cost
				dist[i]['count'] = count

				if dist[u_idx]['date'] == None:
					dist[i]['date'] = i_time
				else:
					dist[i]['date'] = dist[u_idx]['date'] + t_time
				prev[i] = u_idx

				log("Take [%s] -> [%s]" % (str(u_idx), str(i)))

			log("")
		#log(dist)

	#log("")
	log(dist)
	log(prev)

	return (dist, prev)

def pathfind(stops, end):
	routes = []

	def addPathToRoute(route, stops, dist, src, dst):
		c = dist[src]['count'] - dist[dst]['count']
		route.append({
			"location": {
				"longitude": stops[src]['location']['longitude'],
				"latitude": stops[src]['location']['latitude']
			},
			"count": c
		})
		stops[src]['n_points'] = stops[src]['n_points'] - c

	while len(stops) > 0:
		dist, prev = sjuktra(stops, end)

		best = None
		for i in dist:
			if (best == None or dist[i]['cost'] < dist[best]['cost']) and i != 'end':
				best = i


		route = []
		i = best
		prev_i = None
		while i != 'end':
			stop = stops[i]
			
			if prev_i:
				addPathToRoute(route, stops, dist, prev_i, i)

			prev_i = i
			i = prev[i]

		addPathToRoute(route, stops, dist, prev_i, i)
		route.append({
			"location": {
				"longitude": end['location']['longitude'],
				"latitude": end['location']['latitude']
			},
			"count": 0
		})

		routes.append(route)
		stops = [i for j, i in enumerate(stops) if stops[j]['n_points'] > 0]

	return routes

def main():
	data = sys.argv[1]
	data = json.loads(data)

	paths = pathfind(data['result'], data['end'])
	#log(len(paths))
	print(json.dumps({'paths': paths}))

main()
