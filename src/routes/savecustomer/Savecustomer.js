import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Savecustomer.css';

const title = 'New User Registration';

function Savecustomer({message, redirectlink, message1}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
        <a href={redirectlink}>{message1} </a>
                      
      </div>
    </div>
  );
}

Savecustomer.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Savecustomer);
