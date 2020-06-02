import React from 'react';

// Styles
import styles from "./ListContent.module.css";

// icons
import Delete from './delete.png'
import { ReactComponent as Cart } from './cart.svg'

const Product = ({ product, handleDelete, handleAddToCart }) => {
    const cartFill = product.inCart ? 'green' : '';
    return (
        <div className={styles.product}>
            <span className={styles.buttons}>
                <Cart fill={cartFill} onClick={() => handleAddToCart(product._id)} />
                <span style={product.inCart ? { color: 'green' } : null}>{product.name}</span>
            </span>
            <span className={styles.delete} onClick={() => handleDelete(product._id)}>
                <img src={Delete} alt="delete" />
            </span>
        </div>
    );
};

export default Product;