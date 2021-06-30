// create an express app
const express = require("express")
const cp = require('cookie-parser')
const app = express()

// use the express-static middleware
app.use(express.static("public"))
app.use(express.static("src"))
app.use(cp())
//cookie setting
app.get('/set', (req, res) => {
  // Set the new style cookie
  res.cookie('3pcookie', 'value', { sameSite: 'none', secure: true });
  // And set the same value in the legacy cookie
  res.cookie('3pcookie-legacy', 'value', { secure: true });
  res.end();
});
// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));
