import React from 'react';

// Styles
import styles from "./ListContent.module.css";

// Components
import Product from './Product';

const ListContent = ({ products, handleDelete, handleAddToCart }) => {
    return (
        <div className={styles.container}>
            {products.map(product => <Product key={product._id} product={product} handleDelete={handleDelete} handleAddToCart={handleAddToCart} />)}
        </div>
    );
};

export default ListContent;