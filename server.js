// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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
    general_endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
    ],
    fav_album_endpoints: [
      {method: "GET", path: "/api/albums", description: "Returns an array of all favorite allbums"},
      {method: "GET", path: "/api/albums/:id", description: "Return an album by it's ID"},
      {method: "POST", path: "/api/albums", description: "Create a new album with request body"},
      {method: "PUT", path: "/api/albums/:id", description: "Update album by id with request body"},
      {method: "DELETE", path: "/api/albums/:id", description: "Delete an album"},
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

// get all albums
app.get('/api/albums', function (req, res) {
  // send all albums as JSON response
  db.Album.find(function(err, albums){
    if (err) { return console.log("index error: " + err); }
    res.json(albums);
  });
});

app.get('/api/albums/:id', function (req, res) {
  // find one album by its id
  db.Album.findById(req.params.id, function(err, album){
    if (err) { return console.log("show error: " + err); }
    res.json(album);
  });
});

// create new album
app.post('/api/albums', function (req, res) {
  // create new album with form data (`req.body`)
  var newAlbum = new db.Album(req.body);
  // add newAlbum to database
  newAlbum.save(function(err, album){
    if (err) { return console.log("create error: " + err); }
    res.json(album);
  });
});

app.put('/api/albums/:id', function (req, res) {
  var albumID = req.params.id;
  var update = req.body;
  db.Album.findOneAndUpdate({_id: albumID}, update, function(err, album){
    if (err) { return console.log("create error: " + err); }
    res.json(album);
  });
});

// delete album
app.delete('/api/albums/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var albumId = req.params.id;

  db.Album.findOneAndRemove({ _id: albumId }, function (err, deletedAlbum) {
    res.json(deletedAlbum);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
