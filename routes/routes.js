const express = require('express');
const RoomController = require("../controllers/RoomController");
const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/rooms/:roomId', async (req, res) => {
  RoomController.getRoom(req.params.roomId)
    .then((room) => {
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ error: 'room not found' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/rooms', async (req, res) => {
  RoomController.createRoom(req.body.roomName)
    .then((room) => {
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(500).json({ error: 'Internal error' });
      }
    })
    .catch(() => res.status(500).send("error"));
});



module.exports = router;
