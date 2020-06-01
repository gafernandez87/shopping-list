import React from 'react';

// Styles
import styles from "./Room.module.css";

const NewProduct = ({ newProductName, handleChange, addProduct }) => {
    return (
        <form className={styles.newProduct} onSubmit={e => e.preventDefault()}>
            <input type="text" value={newProductName} onChange={handleChange} />
            <button type="submit" onClick={addProduct}>+</button>
        </form>
    );
};

export default NewProduct;