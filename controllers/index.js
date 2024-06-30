const path = require('path');
const fs = require('fs');

// fetch categories
const fetchRooms = (req, res) => {
      try {
            // path to json data
            const jsonData = path.join(__dirname, '..', 'json', 'data.json');

            // read data
            const data = fs.readFileSync(jsonData, 'utf-8');

            // format data
            const etc = JSON.parse(data);

            // send rooms
            res.json(etc.rooms)
            console.log(etc.rooms)
      } catch (error) {
            console.error('Error retrieving rooms: ', error);
            res.status(500).json({ error: "internal server error" });
      }
};

// fetch albums (per category)
const fetchAlbums = (req, res) => {
      try {
            // room param
            const room = req.params.room
            console.log(room)
            // path to json data
            const jsonData = path.join(__dirname, '..', 'json', 'data.json');

            // read data
            const data = fs.readFileSync(jsonData, 'utf-8');

            // format data
            const etc = JSON.parse(data);

            const albums = etc.albums[room]
            console.log(albums)

            if (albums) {
                  res.json(albums)
            } else {
                  res.status(404).json({ error: "Room not found" })
            }
      } catch (err) {
            console.error("Error fetching albums: ", err);
            res.status(500).json({ error: "internal server error" })
      }
};

// post a new room
const postRoom = (req, res) => {
      try {
            // room param
            const room = req.body.room
            // path to json data
            const jsonData = path.join(__dirname, '..', 'json', 'data.json');

            // read json 
            const data = fs.readFileSync(jsonData, 'utf-8');
            // parse json
            const etc = JSON.parse(data);
            // write room to json
            etc.rooms.push(room);
            fs.writeFileSync(jsonData, JSON.stringify(etc, null, 2), 'utf-8');

            // send response
            res.status(201).json({ 
                  message: 'Room added successfully', 
                  room: room 
            })
      } catch (err) {
            console.error("Error posting room: ", err)
            res.status(500).json({ error: "interal server error: " + err })
      }
};

// post a new album URI
const postURI = (req, res) => {
      try {
            // extract body parts
            const uri = req.body.uri
            const room = req.body.room
            // read json
            const jsonPath = path.join(__dirname, '..', 'json', 'data.json');
            const data = fs.readFileSync(jsonPath, 'utf-8');
            // parse json
            const etc = JSON.parse(data);
            // write to albums.room array
            etc.albums[room].push(uri);
            fs.writeFileSync(jsonPath, JSON.stringify(etc, null, 2), 'utf-8')
            // send response 
            res.status(500).json({
                  message: `Album added successfully to the ${room} room`
            })
      } catch (err) {
            console.error('Error posting uri: ', err);
            res.status(500).json({ error: "internal server error: " + err})
      }
};

module.exports = { fetchRooms, fetchAlbums, postRoom, postURI };