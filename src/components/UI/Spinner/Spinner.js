import React from 'react';
import classes from './Spinner.module.css';

//presentational component for Spinner object 
const spinner = () => (
    <div className={classes.Loader}>Loading!</div>
);

export default spinner;