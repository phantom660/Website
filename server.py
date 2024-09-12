from http.server import BaseHTTPRequestHandler, HTTPServer

def getFile(url):
    """
    The url parameter is a *PARTIAL* URL of type string that contains
    the path name and query string.
    If you enter the following URL in your browser's address bar:
    `http://localhost:4131/contact?name=joe`
    then the `url` parameter will have the value "/contact?name=joe"

    This function should return a string.
    """
    # The following approach isn't a good approach. A better approach would be to find 
    # the index of ? and/or # and ignore everything after it, then just string-match.
    # You will need to add a string to match some substring of the mycontacts.page name
    # on the next line
    if url.startswith("/mycontacts"):
        return open("mycontacts.html").read()
    elif url.startswith("/aboutme"):
        return open("aboutme.html").read()
    # Note, you will have to add an elif case to return your aboutme.html page - it should
    # be similar to the condition in the beginning of the if statement above.
    else:
        return open("404.html").read()  # file not found, we provide this file!!!!
    

#####################################################################################
# Do NOT Modify the Code Below in the class RequestHandler or the method run        #
#####################################################################################

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Call the student-edited server code.
        message = getFile(self.path)

        
        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        # prepare the response object with minimal viable headers.
        self.protocol_version = "HTTP/1.1"
        # Send response code
        self.send_response(200)
        # Send headers
        # Note -- Content length is the binary length (length of the bits in
        # the byte string returned above, not string length
        self.send_header("Content-Length", len(message))
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()

        # Send the file.
        self.wfile.write(message)
        return

def run():
    PORT = 4131
    print(f"Starting server http://localhost:{PORT}/")
    server = ('', PORT)
    httpd = HTTPServer(server, RequestHandler)
    httpd.serve_forever()
run()
