

import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Forgotpass.css';
import Link from '../../components/Link'

const title = 'Changing Password';

 

function Forgotpass( {errormessage}, context) {
    context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="put" action="forgotpass" >
          
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="email">
              Email:
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
              placeholder="Enter E-mail"
              required="required"             
            />
          <p className={s.p}><b> {errormessage}</b> </p>
          </div>
          <div className={s.formGroup}>
            <button className={s.button}   type="submit" >
              Send Reset Email
            </button>
            
          </div>
        </form>
        
      </div>
    </div>
    
  );
}

Forgotpass.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Forgotpass);