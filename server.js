// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    previous_key_is_funny: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/markjohnson303/express-personal-api/blob/master/README.md",
    base_url: "http://mj-api.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});

app.get('/api/profile', function profile(req, res) {
  res.json({
    name: 'Mark Johnson',
    github_link: 'https://github.com/markjohnson303',
    github_profile_image: 'https://avatars2.githubusercontent.com/u/9029766?v=3&s=460',
    current_city: 'Denver',
    pets: ['none']
  });
});

// get all sites
app.get('/api/campsites', function (req, res) {
  // send all campsites as JSON response
  db.Campsite.find(function(err, campsites){
    if (err) { return console.log("index error: " + err); }
    res.json(campsites);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
