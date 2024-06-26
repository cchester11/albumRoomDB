const router = require('express').Router();
const { fetchRooms , fetchAlbums } = require('../../controllers/index');

router.get('/rooms', fetchRooms);
router.get('/albums/:room', fetchAlbums);

module.exports = router;