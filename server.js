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
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/Kelrynn/express-personal-api",
    base_url: "https://morning-tundra-57382.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},//done
      {method: "GET", path: "/api/profile", description: "Data about me"},//done
      {method: "GET", path: "/api/pets", description: "GETs all pets"},//done
      {method: "GET", path: "/api/pets/:id", description: "GETs one pet, by ID"},//done      
      {method: "POST", path: "/api/pets", description: "creates a new pet"},//done
      {method: "PUT", path: "/api/pets/:id", description: "Edits a Pet"},//done
      {method: "DELETE", path: "/api/pets/:id", description: "creates a new pet"}//done
    ]
  })
});

// GET Profile (user data)
app.get('/api/profile', function(req, res) {
  let profile = {
    name: "Cameron Castells",
    github_link: "https://github.com/Kelrynn/express-personal-api",
    github_profile_image: "https://avatars3.githubusercontent.com/u/31755495?v=4&s=460",
    current_city: "Denver",
    days_old: new Date('12/22/1995'),
    is_awake: false,
    is_hungry: false,
    pets: []
  };
  var compareDate = new Date();
  profile.days_old = compareDate.getTime() - profile.days_old.getTime();
  profile.days_old = Math.round(profile.days_old / 86400000);
  console.log(compareDate.getHours());
  if (compareDate.getHours() > 8 && compareDate.getHours() < 22){
    profile.is_awake = true;
  }
  if ((compareDate.getHours() > 12 && compareDate.getHours() < 14) || (compareDate.getHours() > 19 && compareDate.getHours() < 21)){
    profile.is_hungry = true;
  }
  db.Pets.find({}, function(err, pets){
    profile.pets = pets;
    res.json(profile);
  });
});
//GET all pets 
app.get('/api/pets', function(req, res) {
  db.Pets.find({}, function(err, pets){
    if(err) throw err;
    res.json({pets});
  });
});
//GET one pet by id
app.get('/api/pets/:id', function(req, res) {
  db.Pets.findOne({_id: req.params.id}, function(err, pet){
    if (err) throw err;
    res.json(pet);
  })
})
//POST a new pet, return a JSON object of the added pet
app.post('/api/pets', function(req, res) {
  db.Pets.create(req.body, function(err, pet) {
    if(err) throw err;
    res.json(pet);
  });
});
//PUT a new pet, EDIT the pet by ID.
app.put('/api/pets/:id', function(req, res){
  db.Pets.update({_id: req.params.id}, req.body,function(err, data){
    if (err) throw err;
    res.json(data);
  });
});
//DELETE a pet
app.delete("/api/pets/:id", function (req, res) {
  db.Pets.remove({_id: req.params.id}, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
