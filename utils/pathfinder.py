from sets import Set
import googlemaps
from datetime import datetime
import json
import sys

gmaps = googlemaps.Client(key='AIzaSyD-EkE2N4ULYVKqvd3RpHiy-gQeAVT2fNo')

def cost(time, count):
	return time/count

def timeDistance(p1, p2):
	global gmaps
	#from math import sqrt, pow
	#return sqrt(pow(p1["latitude"] - p2["latitude"], 2) + pow(p1["longitude"] - p2["longitude"], 2))

	now = datetime.now()
	res = gmaps.directions("%s %s" % (p1['location']['latitude'], p1['location']['longitude']),
							"%s %s" % (p2['location']['latitude'], p2['location']['longitude']),
							mode="driving",
							departure_time=now
							)
	#print(res)
	#print("%s %s" % (p1['location']['latitude'], p1['location']['longitude']))
	#print("%s %s" % (p2['location']['latitude'], p2['location']['longitude']))
	try:
		return res[0]['legs'][0]['duration_in_traffic']['value']
	except:
		return None

def sjuktra(stops, end):
	MAX_PEOPLE = 12
	TIMERANGE = 160*60

	unvisited = Set(range(len(stops)))
	unvisited.add("end")

	prev = dict()
	dist = dict()

	for i in unvisited:
		dist[i] = {"cost": 9999999999, "count": 0, "date": 0}
		prev[i] = None

	dist['end'] = {"cost": 0, "count": 0, "date": 0}

	while unvisited:
		# Find smallest unvisited vertex
		u_idx = None
		for i in unvisited:
			if u_idx == None or dist[i] < dist[u_idx]:
				u_idx = i

		u = stops[u_idx] if u_idx != "end" else end
		unvisited.remove(u_idx)

		for i in unvisited:
			if i != u_idx:
				i_count = stops[i]['n_points']
				i_time = stops[i]['date']

				if dist[u_idx]['date'] > i_time:
					continue

				if dist[u_idx]['count'] >= 12:
					continue

				t_time = timeDistance(u, stops[i])
				if not t_time:
					continue

				time = dist[u_idx]['date'] + t_time

				count = dist[u_idx]['count'] + i_count
				if count > MAX_PEOPLE:
					count = count - MAX_PEOPLE

				i_cost = dist[u_idx]['cost'] + cost(t_time, count)


				if i_cost < dist[i] and dist[u_idx]['count'] < MAX_PEOPLE and (abs(time - i_time) < TIMERANGE or dist[u_idx]['date'] == 0):
					dist[i]['cost'] = i_cost
					dist[i]['count'] = count

					if dist[u_idx]['date'] == 0:
						dist[i]['date'] = i_time
					else:
						dist[i]['date'] = dist[u_idx]['date'] + t_time
					prev[i] = u_idx


		#print(dist)

	#print("")
	#print(dist)
	#print(prev)

	return (dist, prev)

def pathfind(stops, end):
	dist, prev = sjuktra(stops, end)

	m = None
	for i in dist:
		if (m == None or dist[i]['cost'] < dist[m]['cost']) and i != 'end':
			m = i

	routes = []
	route = []
	i = m
	#print(m)
	while i != 'end':
		route.append({
			"location": {
				"longitude": stops[i]['location']['longitude'],
				"latitude": stops[i]['location']['latitude']
			},
			"count": dist[i]['count']
		})
		i = prev[i]

	route.append({
		"location": {
			"longitude": end['location']['longitude'],
			"latitude": end['location']['latitude']
		},
		"count": 0
	})

	#print(route)
	routes.append(route)
	return routes

def main():
	data = sys.argv[1]
	data = json.loads(data)

	paths = pathfind(data['result'], data['end'])

	print(json.dumps({'paths': paths}))

main()
