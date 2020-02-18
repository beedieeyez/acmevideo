import SocketServer
import SimpleHTTPServer
import re
import ssl

PORT = 8000 


httpd = SocketServer.ThreadingTCPServer(('', PORT),SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, 
        keyfile='/app/key.pem', 
        certfile='/app/cert.pem', server_side=True)
print "serving at port", PORT
httpd.serve_forever()
