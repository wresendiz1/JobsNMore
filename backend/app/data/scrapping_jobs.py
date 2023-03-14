import requests
import json
import os

cities = ["baltimore"]
#"new-york", "los-angeles","chicago","houston","phoenix","philadelphia","san-antonio","san-diego","dallas","san-jose","austin","jacksonville","fort-worth","columbus","indianapolis","charlotte","san-francisco","seattle","denver","oklahoma-city","nashville","el-paso","washington","boston","las-vegas","portland","detroit","louisville","memphis",
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

for city in cities:
    blank = 0
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'jobsByCity/'+city+'Jobs.json')

    with open(file_path,'w') as f:
        pass            
    allCurJobs = []
    
    for code in jobsCodes:
        url = "https://api.careeronestop.org/v1/jobsearch/1cgBjWAkajxAu5r/" +code+ "/" +city+ "/25/0/0/0/25/0"
        payload={}
        headers = {
        'Authorization': 'Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=='
        }
        response = requests.request("GET", url, headers=headers, data=payload)
        currentCity = response.json()['Jobs']
        allCurJobs.append(currentCity)


final = json.dumps(allCurJobs, indent=2)

with open(file_path, 'w') as outfile:
    outfile.write(final)
