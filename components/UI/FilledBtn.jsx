import styles from './FilledBtn.module.scss'

const FilledBtn = ({children, clickHandler, type}) => {
    return (
        <button onClick={clickHandler} type={type} className={styles.button}>
            {children}
        </button>
    );
}

export default FilledBtn;
