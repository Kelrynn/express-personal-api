// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
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
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/Kelrynn/express-personal-api",
    base_url: "https://morning-tundra-57382.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/pets", description: "GETs all pets"},
      {method: "POST", path: "/api/pets", description: "creates a new pet"},
      {method: "PUT", path: "/api/pets/:id", description: "Edits a Pet"},
      {method: "DELETE", path: "/api/pets/:id", description: "creates a new pet"}
    ]
  })
});

app.get('/api/profile', function(req, res) {
  let profile = {
    name: "Cameron Castells",
    github_link: "https://github.com/Kelrynn/express-personal-api",
    github_profile_image: "https://avatars3.githubusercontent.com/u/31755495?v=4&s=460",
    current_city: "Denver",
    pets: []
  };
  db.Pets.find({}, function(err, pets){
    profile.pets = pets;
    res.json(profile);
  });
});

app.get('/api/pets', function(req, res) {
  db.Pets.find({}, function(err, pets){
    res.json({pets});
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
