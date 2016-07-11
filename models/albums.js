var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AlbumSchema = new Schema({
title: String,
artist: String,
link: String
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
