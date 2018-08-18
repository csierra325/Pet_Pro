#Description
This application demonstrates a full stack application. The front-end contains HTML/CSS, handlebars and elements from Bootstrap framework. The back-end is implemented with Node.js, express, and sequelize.

The user has the option to create an account or login with a previously made account. All the account information is stored on the MySQL database. Once the user is logged in they are directed to their home page.

The home page has text boxes that allows the user to input an event they want to remember for the future or they are able to look at all the previous events they have inserted by clicking on the events link in the navigation bar. All of the users events are also stored on the MySQL database. 

#Installation

To run the application locally, first clone this repository with the following commands. 

git clone https://github.com/Zattelin/Come-Together.git

npm install
-express
-sequelize
-mysql
-mysql2
-body-parser
-express-handlebars
-express-session

Then run the node server locally.

node server.js

Open the local application on port 8080 at the URL: http://localhost:8080/.

Then never forget an event for your pet again!

#Authors
Camille Sierra
Christian Chung
Saif Dar 
Zeppelin Fogarty