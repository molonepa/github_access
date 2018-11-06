import sys
import datetime
from github import Github

# take username as command line argument
uname = raw_input("Enter a github username: ")

g = Github()
user = g.get_user(uname)

# print users repos and commit info
for repo in user.get_repos():

    print(repo.name)

    for commit in repo.get_commits():
        #date = commit.commit.author.date

        # get time of day of commit from ISO 8601 date string
        time = commit.commit.author.date.time()
        print(str(time))
        #print(commit.commit.message)
