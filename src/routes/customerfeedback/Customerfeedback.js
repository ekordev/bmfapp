import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Customerfeedback.css';

const title = 'Customer Feedback';

function Customerfeedback({email, customeremail}, context) {
  context.setTitle(title);
  console.log("email: "+email);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="post" action="savefeedback" >
          
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="Provider Email">
              Email:
            </label>
            <input
              className={s.input}
              id="provideremail"
              type="text"
              name="provideremail"
              value ={email}
              readOnly            
            />
          <label className={s.label} htmlFor="Feedback">
              Your valuable Feedback
            </label>
          <label className={s.label} htmlFor="Rate the Service">
              Rate the Service:
            </label>
            <input
              className={s.input}
              id="Rating"
              type="text"
              name="Rating"
             
              placeholder="Rate 1-5 5 being hightest"            
            />
          <label className={s.label} htmlFor="Feedback">
              Your valuable Feedback
            </label>
            <textarea rows="4" cols="50" name="feedback" placeholder="Enter your feedback">
    </textarea>
          </div>
          <div className={s.formGroup}>
            <button className={s.button}   type="submit" >
              Send Feedback
            </button>
            
          </div>
        </form>
        
      </div>
    </div>
  );
}

Customerfeedback.contextTypes = { setTitle: PropTypes.func.isRequired };
export default withStyles(s)(Customerfeedback);
