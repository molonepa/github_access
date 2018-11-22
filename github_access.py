"""
This file pulls user data from the github api, writes it to a .json file, 
and runs a server at localhost:8080 where a visualisation of the data can be viewed
"""
import sys
import datetime
import json
from github import Github
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

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

# code for running server
handler = SimpleHTTPRequestHandler
server = BaseHTTPServer.HTTPServer
protocol = "HTTP/1.0"

addr = '127.0.0.1'
port = 8080

server_addr = (addr, port)

handler.protocol_version = protocol
httpd = server(server_addr, handler)

sa = httpd.socket.getsockname()
print "Data visualisation can be viewed at http://localhost:8080/bar.html"
httpd.serve_forever()
