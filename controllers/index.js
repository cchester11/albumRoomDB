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
            res.json(data.rooms)
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

            const albums = etc.albums.jazz

            res.json(albums)
      } catch (err) {
            console.error("Error fetching albums: ", err);
            res.status(500).json({ error: "internal server error"})
      }
};

module.exports = { fetchRooms , fetchAlbums };