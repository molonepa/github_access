"""
This file pulls user data from the github api and writes it to a .json file
"""

import sys
import datetime
import json
from github import Github

data = {}
data['user1'] = []
data['user2'] = []

commits1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
commits2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

outfile = open('data.json', 'w')

# take usernames as command line argument
print "Enter the usernames of two github users you would like to compare..."
uname1 = raw_input("User 1: ")
uname2 = raw_input("User 2: ") 

g = Github()
user = g.get_user(uname1)

# print users repos and commit info
for repo in user.get_repos():
    for commit in repo.get_commits():
        # get hour  of commit from ISO 8601 date string
        time = commit.commit.author.date.hour
        # convert datetime object to string and print
        #print(str(time))
        commits1[int(time)] += 1

user = g.get_user(uname2)

for repo in user.get_repos():
    for commit in repo.get_commits():
        # get time of day of commit from ISO 8601 date string
        time = commit.commit.author.date.hour
        # convert datetime object to string and print
        #print(str(time))
        commits2[int(time)] += 1

print(commits1)
print(commits2)

for i in range(0, 24):
    data['user1'].append({
        'time': i,
        'quantity': commits1[i]
        })
    data['user2'].append({
        'time': i,
        'quantity': commits2[i]
        })

# write to data.json
json.dump(data, outfile)
