// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

/*var new_campsite = {description: "Sharp rocks. Middle of nowhere."};

db.Campsite.create(new_campsite, function(err, campsite){
if (err){
    return console.log("Error:", err);
  }

  console.log("Created new campsite", campsite._id);
  process.exit(); // we're all done! Exit the program.
 });
 */

var new_album = {
	title: "Thrill of the Arts",
	artist: "Vulfpeck",
	link: "https://open.spotify.com/album/0LyGgFrZFXpRKpgj664Xu7"
};

db.Album.create(new_album, function(err, album){
if (err){
    return console.log("Error:", err);
  }

  console.log("Created new album", album._id);
  process.exit(); // we're all done! Exit the program.
 });