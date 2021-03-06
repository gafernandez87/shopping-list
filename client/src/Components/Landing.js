import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Utils
import apiCall from "../utils/apiCall";

// Styles
import styles from "./Landing.module.css";

const Landing = () => {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();

  const createRoom = () => {
    apiCall("/api/rooms", {
      method: "POST",
      body: JSON.stringify({ roomName: roomName })
    }).then(res => {
      history.push(`/room/${res._id}`);
    }).catch(err => console.log(err));
  }

  return (
    <div className={styles.landing}>
      <section className={styles.newRoom}>
        <h2 className={styles.title}>Shopping time!</h2>
        <label className={styles.roomName}>Ingresa el nombre de la sala</label>
        <input
          type="text"
          className={styles.input}
          value={roomName}
          placeholder="Ej: Compra semanal"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className={styles.button} onClick={createRoom}>
          CREAR SALA
        </button>
      </section>
    </div>
  );
};

export default Landing;
