const util = require('util');
const inspect = (object, depth = 1) => console.log(util.inspect(object, { depth, colors: true, showHidden: true }));

const propSumReducer = prop => (acc, i) => acc + i[prop];

class TrackCollection extends Array {

    get totalDuration() {
        return this.reduce(propSumReducer('length'), 0);
    }

    get averageRating() {
        return this.reduce(propSumReducer('rating'), 0) / this.length;
    }

    addTrack(track) {
        this.push(track);
    }
}

class Library extends TrackCollection {

    constructor(name, creator) {
        super();
        this.name = name;
        this.creator = creator;
        this.playlists = [];
    }

    addPlaylist(playlist) {
        this.playlists.push(playlist);
    }
}

class Playlist extends TrackCollection {
    constructor(name, tracks = []) {
        super(...tracks);
        this.name = name;
    }
}

class Track {
    constructor(name, rating, length) {
        this.name = name;
        this.rating = rating;
        this.length = length;
    }
}


function TrackCollection() {
    console.log("TrackCollection::ctor");
    this.tracks = []
}

TrackCollection.prototype.addTrack = function(track) {
    if(!(track instanceof Track)) {
        throw new TypeError("Expected a Track");
    }
    console.log("TrackCollection::addTrack");
    this.tracks.push(track)
}

const Library = function(name, creator) {
    TrackCollection.call(this);
    console.log("Library::ctor");
    this.name = name;
    this.creator = creator;
    this.playlists = [];
}
Library.prototype = Object.create(TrackCollection.prototype);
Library.prototype.addPlaylist = function(playlist) {
    if(!(playlist instanceof Playlist)) {
        throw new TypeError("Expected a Playlist");
    }
    this.playlists.push(playlist);
}

Library.prototype.toString = function() {
    return `"Library - ${this.name}"`;
}


function Playlist(playlistName) {
    TrackCollection.call(this);
    console.log("Playlist::ctor");
    this.playlistName = playlistName;
}
Playlist.prototype = Object.create(TrackCollection.prototype);
Playlist.prototype.totalDuration = function PlaylistTotalDuration() {
    return this.tracks.map(track => track.length).reduce((a,b) => a+b);
}
Playlist.prototype.overallRating = function PlaylistOverallRating() {
    if(this.tracks.length === 0) { return 0; }
    return this.tracks.map(track => track.rating).reduce((a,b) => a+b) / this.tracks.length;
}

const Track = function(title, rating, length) {
    this.title = title;
    this.rating = rating;
    this.length = length;
}


const library = new Library('My Awesome Library', 'A guy');
library.addTrack(new Track('Song 2', 5.0, 4.3));
const playlist = new Playlist('Sad songs');
playlist.addTrack(new Track('Sad Song', 2.1, 5.0));
library.addPlaylist(playlist);

playlist.averageRating = 5
console.log(playlist.averageRating)
inspect(playlist, 2)
// console.log(`This is my library: ${library}`)

// console.log(library.playlists[0].overallRating())

//The prototype chain
//SomethingOnTheLeftOfTheDot.SomethingOnTheRightOfTheDot

// let majorJams = new Library("MyLibrary", "The Collector")

// let totallyHip = new Playlist("New Jams")
// majorJams.addPlaylist(totallyHip)

// let majorJams = new Library("MyLibrary", "The Collector")
// let totallyHip = new Playlist("New Jams")
// let banjoTunes = new Track("Symphony No. 9", 5, 180)



// const library = Object.create()
//     tracks: {
//             },
//     playlists: {
//                },
//     printPlaylists: function () {
//     },
//     printTracks: function () {
//     }
//   };
  
//   var library = {
//     tracks: { t01: { id: "t01",
//                      name: "Code Monkey",
//                      artist: "Jonathan Coulton",
//                      album: "Thing a Week Three" },
//               t02: { id: "t02",
//                      name: "Model View Controller",
//                      artist: "James Dempsey",
//                      album: "WWDC 2003"},
//               t03: { id: "t03",
//                      name: "Four Thirty-Three",
//                      artist: "John Cage",
//                      album: "Woodstock 1952"}
//             },
//     playlists: { p01: { id: "p01",
//                         name: "Coding Music",
//                         tracks: ["t01", "t02"]
//                       },
//                  p02: { id: "p02",
//                         name: "Other Playlist",
//                         tracks: ["t03"]
//                       }
//                },
  
//     printPlaylists: function () {
//       var playlists = this.playlists;
//       for (p in playlists) {
//         var tracks = playlists[p].tracks;
//         var name = playlists[p].name;
//         var result = `${p}: ${name} - ${tracks.length} tracks`;
//       console.log(result);
//       }
//     },
  
//     printTracks: function () {
//       var tracks = this.tracks;
//       for (t in tracks) {
//         var trackName = tracks[t].name;
//         var trackArtist = tracks[t].artist;
//         var trackAlbum = tracks[t].album;
//         var result = `${t}: ${trackName} by ${trackArtist} (${trackAlbum})`;
//       console.log(result);
//       }
//     },
  
//     printPlaylist: function (playlistId) {
//       var playlist = library.playlists[playlistId];
//       var playlistListing = `${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`;
  
//       console.log(playlistListing);
  
//       playlist.tracks.forEach(function (trackId) {
//         var track = library.tracks[trackId];
//         var trackListing = `${trackId}: ${track.name} by ${track.artist} (${track.album})`;
  
//         console.log(trackListing);
//       });
  
//     },
  
//     addTrackToPlaylist: function (trackId, playlistId) {
//       var trackMove = this.tracks[trackId].id;
//       var playlistGain = this.playlists[playlistId].tracks;
//       playlistGain.push(trackMove);
  
//       console.log(playlistGain);
  
//     },
  
//     uid: function() {
//       return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     },
  
//     addTrack: function (name, artist, album) {
//       var newElementObj = this.tracks;
//       var newElement = {};
//       var genId = this.uid();
  
//       newElement.id = genId;
//       newElement.name = name;
//       newElement.artist = artist;
//       newElement.album = album;
  
//       newElementObj[genId] = newElement;
  
//       console.log(newElementObj);
  
//     },
  
//     addPlaylist: function (name) {
//         var newElementObj = this.playlists;
//         var newElement = {};
//         var genId = this.uid();
  
//         newElement.id = genId;
//         newElement.name = name;
//         newElement.tracks = [];
  
//         newElementObj[genId] = newElement;
//         console.log(newElementObj);
  
//     }
//   };
  
//   library.printPlaylists();
//   library.printTracks();
//   library.printPlaylist("p01");
//   library.addTrackToPlaylist("t01", "p02");
//   library.addTrack("Symphony No. 9", "Ludwig van Beethoven", "Fundamental Fundamentals");
//   library.addPlaylist("Music for Monkeys");