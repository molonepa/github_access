"""
This file pulls user data from the github api and writes it to a .json file
"""

import sys
import datetime
import json
from github import Github

data = {}
data['commits'] = []

qty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

outfile = open('data.json', 'w')

# take usernames as command line argument
print "Enter the usernames of two github users you would like to compare..."
uname = ["",""]
uname[0] = raw_input("User 1: ")
uname[1] = raw_input("User 2: ") 

g = Github()

for u in uname:
    user = g.get_user(u)
    # print users repos and commit info
    for repo in user.get_repos():
        for commit in repo.get_commits():
            # get hour  of commit from ISO 8601 date string
            time = commit.commit.author.date.hour
            qty[int(time)] += 1

    for i in range(0, 24):
        data['commits'].append({
            'user': u,
            'time': i,
            'quantity': qty[i]
            })
        qty[i] = 0

# write to data.json
json.dump(data, outfile)
