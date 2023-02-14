import requests

urls = [
    "https://gitlab.com/api/v4/projects/42829136/repository/contributors", # commits by user and total
    "https://gitlab.com/api/v4/projects/42829136/issues_statistics?scope=all", # total issues
    "https://gitlab.com/api/v4/projects/42829136/issues" # issues by user
]

headers = {
    "private_token":"glpat-uTr1hPQiv_1eRyRgwUx-"
}

def get_commits():
    response = requests.get(urls[0], headers=headers)
    data = response.json()
    total = 0
    users = {}
    javier = 0
    for user in data:
        total += user['commits']
        if user['email'] == "javierr8906@gmail.com" or user['email'] == "javier.ramirez5@utexas.edu":
            javier += user["commits"]
        else:
            users[user["email"]] = user["commits"]
    users["javier.ramirez5@utexas.edu"] = javier

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

if __name__ == '__main__':
    print(get_commits())
    print(get_issues())
    print(get_issues_by_user())