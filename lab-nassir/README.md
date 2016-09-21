![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Lab 07
======

## Cowsay HTTP Server

This simple HTTP server built with Node.js will return cowsay images for either entered text or JSON objects. See all the famous cowsay images, without the convenience of using terminal!

# Connect to the server

These instructions assume you are using [HTTPie](https://httpie.org/).

* From the home directory, launch the server using `node server.js`.
* In a separate shell instance, connect to the server using `http localhost:3000`.
* By default, the cowsay server will respond with `'Hello World!'`. Additional commands are below.

# GETting a cowsay images

* Append `/cowsay` to `localhost:3000`, and add the querystring `text==message` where 'message' is what you want the cow to say! If the message is longer than a single word, enclose it within single quotes:

`http localhost:3000/cowsay text=='Here is a nice long message'`.

* To change the default cow image, include an `f==cowsayimage` string in addition to text, where 'cowsayimage' is the image that you desire to see. `f==dragon` will give you a loving rendered dragon that practically leaps from the page, and which must have taken a great deal of effort to render. `f==stimpy` will give you Stimpy, a popular cartoon character from decades ago that I remember fondly. `f==sodomize` will display an image of a stick man in illicit congress with a cow, a fact which I submit without additional comment.
* For a list of all available cowsay images, enter `cowsay -l` in your terminal. This list is currently only accessible through the terminal.
* If you don't include a message, the cowsay image will give you an standard error message with further instructions.

# POSTing a cowsay image

* Put a .json file in the home directory containing a JSON object with a "text" parameter. For your convenience, a .json file is already present in the home directory; it is called `cow.json`, with a default message ready for customization.
* Pipe this image into the program using POST: `cat cow.json| http POST localhost:3000/cowsay`. This command also accepts `f==cowsayimage`, as with GET above.
* The chosen cowsay will speak the message included in the JSON object.
* If you don't have a .json file or your JSON object is improperly formatted, the cowsay will give you an error message. Another error message will show if your JSON object does not have a "text" parameter as expected.

# ENDing your session

* All sessions end automatically after each request receives a response.
* Close the server with `^C`.
