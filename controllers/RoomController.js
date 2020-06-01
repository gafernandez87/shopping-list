const Room = require('../models/Room');

exports.createRoom = (roomName) => {
  const room = new Room({ name: roomName });
  return room.save();
};

exports.getRoom = (roomId) => {
  return Room.findById(roomId);
};

exports.addProduct = async (roomId, product) => {
  const room = await Room.findById(roomId);
  room.products.push({ name: product, inCart: false });
  return room.save();
};

exports.deleteProduct = async (roomId, productId) => {
  const room = await Room.findById(roomId);
  room.products = room.products.filter(product => product._id.toString() !== productId);
  return room.save();
};


exports.toggleInCart = async (roomId, productId) => {
  const room = await Room.findById(roomId);
  room.products = room.products.map(product => {
    if (product._id.toString() === productId) {
      return {
        ...product._doc,
        inCart: !product.inCart,
      }
    }
    return { ...product._doc };
  });
  return room.save();
};
