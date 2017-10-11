 // This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var pets = [
	{
		name: "Bogey",
		type: "Dog",
		breed: "Black Labrador Retriever",
		age: 11
	},
	{
		name: "Attacus",
		type: "Cat",
		breed: "Singapura",
		age: 6
	},
	{
		name: "Mr.Slinky",
		type: "Snake",
		breed: "Hognose",
		age: 2
	}
];


db.Pets.remove({}, function(err){
	db.Pets.create(pets, function(err, pets){
		if (err){
		return console.log("Error:", err);
		}

		console.log("Created new pets", pets);
		process.exit(); // we're all done! Exit the program.
	});

});
