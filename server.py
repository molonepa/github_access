"""
This file contains the code for running the server where the bar chart can be viewed
"""

import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

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
