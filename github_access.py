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

# init data buffer to be written to json file
data = {}
data['commits'] = []

outfile = open('data.json', 'w')

# take username as command line argument
uname = raw_input("Enter a github username: ")

g = Github()
user = g.get_user(uname)

# print users repos and commit info
for repo in user.get_repos():
    print(repo.name)
    for commit in repo.get_commits():
        # get time of day of commit from ISO 8601 date string
        msg = commit.commit.message
        time = commit.commit.author.date.time()
        # convert datetime object to string and print
        print(str(time))
        data['commits'].append({
            'msg': msg,
            'time': str(time)
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
