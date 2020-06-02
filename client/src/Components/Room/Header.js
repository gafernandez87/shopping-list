import React from 'react';

// Styles
import styles from "./Header.module.css";

// icons
import BackIcon from './back.png'


const Header = ({ title, counts, handleBack }) => {
    return (
        <div className={styles.header}>
            <img src={BackIcon} alt="back" onClick={handleBack} />
            <span>{title}</span>
            <span className={styles.count}>{counts}</span>
        </div>
    );
};

export default Header;