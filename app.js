const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});


// Controllers
const RoomController = require('./controllers/RoomController');

const server = http.createServer(app);

const io = socketIo(server);

const port = process.env.PORT || 4001;

// Database
mongoose.connect('mongodb://127.0.0.1/shopping-list', { useNewUrlParser: true });
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
      .then(room => socket.emit("room", room));
  });

  socket.on("deleteProduct", params => {
    RoomController.deleteProduct(params.roomId, params.product)
      .then(room => socket.emit("room", room));
  });

  socket.on("toggleInCart", params => {
    RoomController.toggleInCart(params.roomId, params.product)
      .then(room => socket.emit("room", room));
  });

});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
