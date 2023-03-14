import requests
import json

states_id = ["new-york", "los-angeles","chicago","houston","phoenix","philadelphia","san-antonio","san-diego","dallas","san-jose","austin","jacksonville","fort-worth","columbus","indianapolis","charlotte","san-francisco","seattle","denver","oklahoma-city","nashville","el-paso","washington","boston","las-vegas","portland","detroit","louisville","memphis","baltimore"]
clustersCodes = ["4.0000", "6.0000","8.0000", "11.0000", "15.0000"]
jobsPerClust = 6
jobsCodes = []    


for code in clustersCodes:
    #Getting jobs for clusters
    url = "https://services.onetcenter.org/ws/online/career_clusters/"+code
    payload={}
    headers = {
    'Accept': 'application/json',
    'Authorization': 'Basic dXRleGFzMToyODkzY3Z1'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()['occupation']

    for i in range(jobsPerClust):
        code = data[i]['code']
        jobsCodes.append(code)

print(jobsCodes)    