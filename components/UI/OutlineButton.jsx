import React from 'react';
import styles from './OutlineButton.module.scss'

const OutlineButton = ({children, clickHandler}) => {

    return (
        <button onClick={clickHandler} className={styles.outlineBtn}>
            {children}
        </button>
    );
}

export default OutlineButton;
