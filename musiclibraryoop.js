var library = {
    tracks: { // ...
            },
  
    playlists: { // ...
               },
  
    printPlaylists: function () {
      // ...
    },
  
    printTracks: function () {
  
    }
  
    // ...
  
  };
  
  
  
  var library = {
    tracks: { t01: { id: "t01",
                     name: "Code Monkey",
                     artist: "Jonathan Coulton",
                     album: "Thing a Week Three" },
              t02: { id: "t02",
                     name: "Model View Controller",
                     artist: "James Dempsey",
                     album: "WWDC 2003"},
              t03: { id: "t03",
                     name: "Four Thirty-Three",
                     artist: "John Cage",
                     album: "Woodstock 1952"}
            },
    playlists: { p01: { id: "p01",
                        name: "Coding Music",
                        tracks: ["t01", "t02"]
                      },
                 p02: { id: "p02",
                        name: "Other Playlist",
                        tracks: ["t03"]
                      }
               },
  
    printPlaylists: function () {
      var playlists = this.playlists;
      for (p in playlists) {
        var tracks = playlists[p].tracks;
        var name = playlists[p].name;
        var result = `${p}: ${name} - ${tracks.length} tracks`;
      console.log(result);
      }
    },
  
    printTracks: function () {
      var tracks = this.tracks;
      for (t in tracks) {
        var trackName = tracks[t].name;
        var trackArtist = tracks[t].artist;
        var trackAlbum = tracks[t].album;
        var result = `${t}: ${trackName} by ${trackArtist} (${trackAlbum})`;
      console.log(result);
      }
    },
  
    printPlaylist: function (playlistId) {
      var playlist = library.playlists[playlistId];
      var playlistListing = `${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`;
  
      console.log(playlistListing);
  
      playlist.tracks.forEach(function (trackId) {
        var track = library.tracks[trackId];
        var trackListing = `${trackId}: ${track.name} by ${track.artist} (${track.album})`;
  
        console.log(trackListing);
      });
  
    },
  
    addTrackToPlaylist: function (trackId, playlistId) {
      var trackMove = this.tracks[trackId].id;
      var playlistGain = this.playlists[playlistId].tracks;
      playlistGain.push(trackMove);
  
      console.log(playlistGain);
  
    },
  
    uid: function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
  
    addTrack: function (name, artist, album) {
      var newElementObj = this.tracks;
      var newElement = {};
      var genId = this.uid();
  
      newElement.id = genId;
      newElement.name = name;
      newElement.artist = artist;
      newElement.album = album;
  
      newElementObj[genId] = newElement;
  
      console.log(newElementObj);
  
    },
  
    addPlaylist: function (name) {
        var newElementObj = this.playlists;
        var newElement = {};
        var genId = this.uid();
  
        newElement.id = genId;
        newElement.name = name;
        newElement.tracks = [];
  
        newElementObj[genId] = newElement;
        console.log(newElementObj);
  
    }
  };
  
  library.printPlaylists();
  library.printTracks();
  library.printPlaylist("p01");
  library.addTrackToPlaylist("t01", "p02");
  library.addTrack("Symphony No. 9", "Ludwig van Beethoven", "Fundamental Fundamentals");
  library.addPlaylist("Music for Monkeys");