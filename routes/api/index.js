const router = require('express').Router();
const { fetchRooms , fetchAlbums, postRoom } = require('../../controllers/index');

router.get('/rooms', fetchRooms);
router.get('/albums/:room', fetchAlbums);
router.post('/rooms', postRoom);

module.exports = router;