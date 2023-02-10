import requests

# for unit tests
# url = "https://gitlab.com/api/v4/projects/<project_id>/pipelines/<pipeline_id>/test_reports"


urls = [
    "https://gitlab.com/api/v4/projects/42829136/repository/contributors", # commits by user and total
    "https://gitlab.com/api/v4/projects/42829136/issues_statistics?scope=all", # total issues
    "https://gitlab.com/api/v4/projects/42829136/issues", # issues by user
]

headers = {
    "private_token":"glpat-uTr1hPQiv_1eRyRgwUx-"
}

def get_commits():
    response = requests.get(urls[0], headers=headers)
    data = response.json()
    total = 0
    users = {}
    for user in data:
        total += user['commits']
        users[user['name']] = user['commits']
    return total, users

def get_issues():
    response = requests.get(urls[1], headers=headers)
    data = response.json()
    return data['statistics']['counts']['all']

def get_issues_by_user():
    response = requests.get(urls[2], headers=headers)
    data = response.json()
    users = {}
    for issue in data:
        if issue['author']['username'] not in users:
            users[issue['author']['username']] = 1
        else:
            users[issue['author']['username']] += 1
    return users

print(get_commits())