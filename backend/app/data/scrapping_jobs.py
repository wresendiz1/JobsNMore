import requests
import json
import os

cities = ["New York, NY", "los-angeles","chicago","houston","phoenix","philadelphia","san-antonio","san-diego","dallas","san-jose","austin","jacksonville","fort-worth","columbus","indianapolis","charlotte","san-francisco","seattle","denver","oklahoma-city","nashville","el-paso","washington","boston","las-vegas","portland","detroit","louisville","memphis", "baltimore"]
clustersCodes = ["4.0000", "6.0000","8.0000", "11.0000", "15.0000"]
jobsPerClust = 6
jobsCodes = ["43-4051.00","43-9061.00","43-3031.00","43-1011.00","43-6011.00","15-1299.00","13-2011.00","11-3031.00","11-3031.01","41-3021.00","43-3071.00","13-2072.00","43-6013.00","29-2011.01","29-2011.02","29-2012.01","29-2011.04","29-2012.00","13-1161.01","13-1082.00","15-1232.00","15-1299.00","15-1299.08","15-1299.03","17-2112.01","17-2112.00","17-2112.03","17-2141.02","17-2141.01","17-2141.00"]    

"""
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
"""

for city in cities:
    blank = 0
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'jobsByCity/'+city+'Jobs.json')

    with open(file_path,'w') as f:
        pass            
    currentCity = []

    for code in jobsCodes:
        url = "https://api.careeronestop.org/v1/jobsearch/1cgBjWAkajxAu5r/" +code+ "/" +city+ "/25/0/0/0/100/0"
        payload={}
        headers = {
        'Authorization': 'Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=='
        }
        response = requests.request("GET", url, headers=headers, data=payload)
        currentCode = response.json()['Jobs']
        
        for job in currentCode:
            job.pop('Fc')
            job['code']=code
        currentCity.append(currentCode)

    final = json.dumps(currentCity, indent=2)
    with open(file_path, 'w') as outfile:
        outfile.write(final)
