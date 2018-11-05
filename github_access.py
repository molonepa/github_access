import sys
from github import Github

# take username as command line argument
uname = str(sys.argv[1])

g = Github()

user = g.get_user(uname)

# print users repos and commit dates for each repo
for repo in user.get_repos():
    print(repo.name)
    for commit in repo.get_commits():
        print(commit.commit.author.date)
