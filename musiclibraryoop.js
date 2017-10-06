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


const library = new Library('Slow Hands', 'Hand Solo');
library.addTrack(new Track('R2D3', 5.0, 180));
library.addTrack(new Track('C3PNo', 4.0, 240))
const playlist = new Playlist('Humble Bumble');
playlist.addTrack(new Track('So Bumbly Today', 3.0, 200));
library.addPlaylist(playlist);