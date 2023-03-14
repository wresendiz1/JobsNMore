import requests
import json

access_key = 'a6535523bd370b8f323daba25fa4b099'
secret_key = '45d8b14126edb05120cde17e7cc24c32'

states_id = ["new-york-ny", "los-angeles-la","chicago","houston","phoenix","philadelphia","san-antonio","san-diego","dallas","san-jose","austin","jacksonville","fort-worth","columbus","indianapolis","charlotte","san-francisco","seattle","denver","oklahoma-city","nashville","el-paso","washington","boston","las-vegas","portland","detroit","louisville","memphis","baltimore"]

final_json = []

for city in states_id:
	id_req = requests.get('https://api.roadgoat.com/api/v2/destinations/auto_complete?q='+city+'-usa', auth=(access_key, secret_key))
	id = id_req.json()['data'][0]['id']


	response = requests.get('https://api.roadgoat.com/api/v2/destinations/'+id,auth=(access_key, secret_key))
	data = response.json()['data']

	city = data['attributes']['short_name']
	population = data["attributes"]["population"]
	state = data["attributes"]['long_name'].split(', ')[1]
	budget = data['attributes']['budget'][next(iter(data['attributes']['budget']))]['text']
	safety = data['attributes']['safety'][next(iter(data['attributes']['safety']))]['text']
	rating = data['attributes']['average_rating']

	print(population, state, budget, safety, rating)
	entry = {'City': city,'State':state,'Population':population,'Budget':budget,'Safety':safety,'Average Rating':rating}
	final_json.append(entry)

final = json.dumps(final_json, indent=2)

with open('locations_raw_data.json','w') as outfile:
	outfile.write(final)
