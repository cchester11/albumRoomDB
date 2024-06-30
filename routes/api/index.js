const router = require('express').Router();
const { fetchRooms , fetchAlbums, postRoom, postURI } = require('../../controllers/index');

router.get('/rooms', fetchRooms);
router.get('/albums/:room', fetchAlbums);
router.post('/rooms', postRoom);
router.post('/albums', postURI);

module.exports = router;