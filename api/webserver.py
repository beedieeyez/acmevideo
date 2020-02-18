import ast
import jsonurl
import urlparse
#import urllib.parse 
import cgi
import SocketServer
import SimpleHTTPServer
import re
import urllib3
import psycopg2
import json
import base64
import ssl
out=""



PORT = 9099

def databaseQuery(fname,lname):
    connection_parameters = {
        'host': 'acmedb',
        'database': 'dvdrental',
        'user': 'admin'
         
    }
    first=fname
    last=lname
    actorSQLquery =  'SELECT actor_id,first_name,last_name  FROM  actor WHERE lower(first_name) like  lower(\'{}%%\') and  lower(last_name) like lower(\'{}%%\')'.format(first,last) 

    filmIdSQLquery =  'SELECT film_actor.film_id  FROM actor FULL JOIN film_actor ON actor.actor_id = film_actor.actor_id WHERE lower(actor.first_name)  LIKE lower(\'{}%%\') and lower(actor.last_name)  LIKE lower(\'{}%%\');'.format(first,last)


    conn =  psycopg2.connect(**connection_parameters)
    cur = conn.cursor()
    cur.execute(actorSQLquery)
    actorInfo=[]
    actorColumns = ('actor_id','first_name','last_name')
    filmInfoColumns = ('title','description','release_year','rating','length')
    filmIDColumns = ('film_id')
    actorInfo=cur.fetchall() 
    actorResults=[]
    for actorRow  in actorInfo:
      actorResults.append(dict(zip(actorColumns, actorRow)))
    actorResultsCount=0
    for actorResult in actorResults:

      filmIdSQLquery =  'SELECT film_actor.film_id  FROM actor FULL JOIN film_actor ON actor.actor_id = film_actor.actor_id WHERE lower(actor.first_name)  LIKE lower(\'{}%%\') and lower(actor.last_name)  LIKE lower(\'{}%%\');'.format(actorResult["first_name"],actorResult["last_name"])
      cur.execute(filmIdSQLquery)
      filmIds=cur.fetchall()
      newFilmId=[]
      for filmID in filmIds:
        newFilmId.append(filmID[0]) 
      newFilmIdchanged=tuple(newFilmId)

      filmInfoSQLquery = 'select title, description, release_year,rating,length from  film where  film_id  in {};'.format(newFilmIdchanged) 
      cur.execute(filmInfoSQLquery)
      filmInfos = cur.fetchall()
      filmInfoResults=[]
      for filmInfo in filmInfos:
        filmInfoResults.append(dict(zip(filmInfoColumns, filmInfo)))
        actorResultsCount+=1

      actorResult["FilmData"]=filmInfoResults
        
        
      
    conn.close()
    first="" 
    last=""
    actorResults = json.dumps(actorResults)
    return base64.encodestring(str(actorResults))


class CustomHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
   def do_GET(self):
      global out
      if None != re.search('/api/*', self.path):
         question = self.path.split('?')[-1]
         jsonRequest = base64.decodestring(question)
         jsonRequest = json.loads(jsonRequest)
         self.send_response(200)
         self.send_header('Content-type','text/plain')
         self.send_header('Access-Control-Allow-Origin','*')
         #self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
         self.end_headers()
         self.wfile.write(databaseQuery(fname=jsonRequest["fname"],lname=jsonRequest["lname"]))

         return

      else:
         self.send_response(200)
         self.send_header('Content-type','text/html')
         self.send_header('Access-Control-Allow-Origin', '*')
         self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
         self.send_header("Access-Control-Allow-Headers", "x-api-key,Content-Type") 
         self.end_headers()
         self.wfile.write("ACME API")
         return


httpd = SocketServer.ThreadingTCPServer(('', PORT),CustomHandler)
httpd.socket = ssl.wrap_socket (httpd.socket,
        keyfile='key.pem',
        certfile='cert.pem', server_side=True)

httpd.serve_forever()
