import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

//Components
import Header from './Header';
import ListContent from './ListContent';
import NewProduct from './NewProduct';


// import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

// Styles
import styles from "./Room.module.css";

let socket;

const Room = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [newProduct, setNewProduct] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket = socketIOClient({
      query: { roomId: roomId },
    });

    socket.on("room", (room) => setRoom(room));
  }, []);

  const addProduct = () => {
    socket.emit("addProduct", { roomId: roomId, product: newProduct });
    setNewProduct("");
  };

  const deleteProduct = product => socket.emit("deleteProduct", { roomId: roomId, product: product });
  const toggleInCart = product => socket.emit("toggleInCart", { roomId: roomId, product: product });

  const goHome = () => history.push("/");

  if (room) {
    const inCarCount = room.products.filter(product => product.inCart).length;
    return (
      <div className={styles.room}>
        <Header title={`${room.name} (${inCarCount}/${room.products.length})`} handleBack={goHome} />
        <NewProduct handleChange={e => setNewProduct(e.target.value)} addProduct={addProduct} newProductName={newProduct} />
        <ListContent products={room.products} handleDelete={deleteProduct} handleAddToCart={toggleInCart} />
      </div>
    );
  }

  return <div>Loading</div>;
};

export default Room;
