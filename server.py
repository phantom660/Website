from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import unquote_plus


def submission_to_table(form_data: dict[str, str]) -> str:
    """
    TODO: Takes a dictionary of form parameters and returns an HTML table row

    An example form_data dictionary might look like:
    {
     'name': 'Ryan Hill',
     'location': '2-209 Keller Hall; 200 Union Street SE; Minneapolis, MN 55455',
     'contactInformation': 'Favorite TA',
     'email': 'hill1886@umn.edu',
     'website': 'https://canvas.umn.edu/courses/460624',
    }
    """
    pass


# NOTE: Please read the updated function carefully, as it has changed from the
# version in the previous homework. It has important information in comments
# which will help you complete this assignment.
def handle_request(url: str, form_data: dict[str, str] | None):
    """
    The url parameter is a *PARTIAL* URL of type string that contains the path
    name and query string.

    If you enter the following URL in your browser's address bar:
    `http://localhost:4131/add-contact.html?name=joe#id=someElement` then the `url` parameter will have
    the value "/add-contact.html?name=joe#id=someElement"

    This function should return two strings in a list or tuple. The first is the
    content to return, and the second is the content-type.
    """

    # Get rid of any query string parameters and fragments
    url, *_ = url.split("?", 1)
    url, *_ = url.split("#", 1)

    if url == "/mycontacts.html":
        return open("static/html/mycontacts.html").read(), "text/html"
    if url == "/add-contact.html":
        return open("static/html/add-contact.html").read(), "text/html"
    elif url == "/aboutme.html":
        return open("static/html/aboutme.html").read(), "text/html"
    elif url == "/img/gophers-mascot.png":
        return open("static/img/gophers-mascot.png", "br").read(), "image/png"
    # NOTE: These files may be different for your server, but we include them to
    # show you examples of how yours may look. You may need to change the paths
    # to match the files you want to serve. Before you do that, make sure you
    # understand what the code is doing, specifically with the MIME types and
    # opening some files in binary mode, i.e. `open(..., "br")`.
    elif url == "/css/style.css":
        return open("static/css/style.css").read(), "text/css"
    elif url == "/js/script.js":
        return open("static/js/script.js").read(), "text/javascript"
    elif url == "/img/Dan1.jpeg":
        return open("static/img/Dan1.jpeg", "br").read(), "image/jpeg"
    elif url == "/img/ryan.png":
        return open("static/img/ryan.png", "br").read(), "image/jpeg"
    elif url == "/img/president-cunningham.jpg":
        return open("static/img/als.jpg", "br").read(), "image/jpeg"
    elif url == "/img/peter.png":
        return open("static/img/president-cunningham.jpg", "br").read(), "image/jpeg"
    elif url == "/img/als.jpg":
        return open("static/img/peter.png", "br").read(), "image/jpeg"
    # TODO: Add update the HTML below to match your other pages and implement `submission_to_table`
    elif url == "/added-contacts.html":
        return ("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Added Submission</title>
</head>
<body>
<header>
    <nav>
        <div>
            <ul>
                <li>
                    <a href="/mycontacts.html">My Contacts</a>
                </li>
                <li>
                    <a href="/add-contact.html">Add Contact</a>
                </li>
                <li>
                    <a href="/aboutme.html">About Me</a>
                </li>
            </ul>
        </div>
    </nav>
</header>
<h1>New Contacts</h1>
<div>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact Information</th>
            <th>Email</th>
            <th>Website</th>
        </tr>
        </thead>
        <tbody>
"""
                + submission_to_table(form_data)
                + """
        </tbody>
    </table>
</div>
</body>
</html>""", "text/html; charset=utf-8")
    else:
        return open("static/html/404.html").read(), "text/html; charset=utf-8"


# You shouldn't need to change content below this. It would be best if you just left it alone.

def get_body_params(body: str) -> dict[str, str]:
    if not body:
        return {}

    parameters = body.split("&")

    # Split each parameter into a (key, value) pair, and escape both
    def split_parameter(parameter):
        k, v = parameter.split("=", 1)
        k_escaped = unquote_plus(k)
        v_escaped = unquote_plus(v)
        return k_escaped, v_escaped

    body_dict = dict(map(split_parameter, parameters))
    print(f"Parsed parameters as: {body_dict}")
    # Return a dictionary of the parameters
    return body_dict


class RequestHandler(BaseHTTPRequestHandler):
    def __c_read_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        body = str(body, encoding="utf-8")
        return body

    def __c_send_response(self, message, response_code, headers):
        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        # Send the first line of response.
        self.protocol_version = "HTTP/1.1"
        self.send_response(response_code)

        # Send headers (plus a few we'll handle for you)
        for key, value in headers.items():
            self.send_header(key, value)
        self.send_header("Content-Length", str(len(message)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()

        # Send the file.
        self.wfile.write(message)

    # noinspection PyPep8Naming
    def do_GET(self):
        # Call the student-edited server code.
        message, content_type = handle_request(self.path, None)

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )

    # noinspection PyPep8Naming
    def do_POST(self):
        message, content_type = handle_request(self.path, get_body_params(self.__c_read_body()))

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )


def main():
    port = 4131
    print(f"Starting server http://localhost:{port}/")
    httpd = HTTPServer(("", port),
                       lambda request, client_address, server: RequestHandler(request, client_address, server))
    httpd.serve_forever()


if __name__ == '__main__':
    main()
