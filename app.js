const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT, MONGO_URI } = require('./utils/Constants');

const routes = require('./routes/routes');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
app.get('*', (_, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Controllers
const RoomController = require('./controllers/RoomController');

const server = http.createServer(app);

const io = socketIo(server);

// Database
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to DB');
});

io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  if (roomId) {
    RoomController.getRoom(roomId).then(room => socket.emit('room', room))
  }

  socket.on("addProduct", params => {
    RoomController.addProduct(params.roomId, params.product)
      .then(room => io.emit("room", room));
  });

  socket.on("deleteProduct", params => {
    RoomController.deleteProduct(params.roomId, params.product)
      .then(room => io.emit("room", room));
  });

  socket.on("toggleInCart", params => {
    RoomController.toggleInCart(params.roomId, params.product)
      .then(room => io.emit("room", room));
  });

});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
