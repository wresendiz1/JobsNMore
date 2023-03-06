import requests

urls = [
    # commits by user and total for a branch, uses email
    "https://gitlab.com/api/v4/projects/42829136/repository/commits",
    # issues by user, uses username
    "https://gitlab.com/api/v4/projects/42829136/issues",
    # get branches
    "https://gitlab.com/api/v4/projects/42829136/repository/branches",
]

headers = {"private_token": "glpat-uTr1hPQiv_1eRyRgwUx-"}


def get_branches():
    response = requests.get(urls[2], headers=headers, timeout=5)
    data = response.json()
    branches = []
    for branch in data:
        branches.append(branch["name"])

    return branches


def get_commits():
    branches = get_branches()
    total = 0
    users = {}
    for branch in branches:
        url = urls[0] + "?ref_name=" + branch
        response = requests.get(url, headers=headers, timeout=5)
        data = response.json()
        for commit in data:
            total += 1
            if commit["author_email"] in users:
                users[commit["author_email"]] += 1
            else:
                users[commit["author_email"]] = 1

    return total, users


def get_issues():
    response = requests.get(urls[1], headers=headers, timeout=5)
    data = response.json()
    users = {}
    total = 0
    for issue in data:
        total += 1
        if issue["author"]["username"] not in users:
            users[issue["author"]["username"]] = 1
        else:
            users[issue["author"]["username"]] += 1
    return total, users


if __name__ == "__main__":
    print(get_commits())
    print(get_issues())
