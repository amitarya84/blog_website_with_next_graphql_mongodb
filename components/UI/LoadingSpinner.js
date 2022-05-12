import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ({ style }) => {
  return <div style={{...style}} className={classes.spinner}></div>;
}

export default LoadingSpinner;