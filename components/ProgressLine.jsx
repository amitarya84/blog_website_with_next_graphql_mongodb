import React from 'react';
import styles from './ProgressLine.module.scss';


const ProgressLine = ({loading}) => {
    
    const styles1 = {
        width: loading ? '100%' : '0%',
        transition: loading ? '1s ease-out' : '0s',
    }

    return (
        <div className={styles.line} style={styles1}></div>
    );
}

export default ProgressLine;
