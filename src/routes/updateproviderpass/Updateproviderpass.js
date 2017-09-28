import React, { Component } from 'react';
import  PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Updateproviderpass.css';
//import Link from '../../components/Link'

const title = 'Update Provider Password';

function Updateproviderpass({message, message1, redirectlink}, context) {
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

Updateproviderpass.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Updateproviderpass);
