import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subscription.css';

const title = 'Customer Message Subscription';

function Subscription({email, id, sessionid}, context) {
  context.setTitle(title);
  console.log("email: "+email);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="post" action="savesubscription" >
          
          <div className={s.formGroup}>
          <input
              className={s.input}
              id="subid"
              type="hidden"
              name="subid"
              value ={id}
                          
            />
            <label className={s.label} htmlFor="Customer Email">
              Email:
            </label>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              value ={email}
              readOnly            
            />
          
          <label className={s.label} htmlFor="Event">
              Event to Subsribe:
            </label>
            <input
              className={s.input}
              id="Evemt"
              type="text"
              name="Event"
             
              placeholder="Birthday, Marriage"            
            />
          <label className={s.label} htmlFor="Date">
              Event Date
            </label>
            <input  className={s.input} type = "date" name="eventdate" placeholder="Enter Event Date">
    </input>
    <label className={s.label} htmlFor="Channel">
              Where to deliver message
            </label>
            <input  className={s.input} type = "text" name="feedback" placeholder="SMS,email">
        </input>l
          </div>
          <div className={s.formGroup}>
            <button className={s.button}   type="submit" >
              Save Subscription
            </button>
            <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
          </div>
        </form>
        
      </div>
    </div>
  );
}

Subscription.contextTypes = { setTitle: PropTypes.func.isRequired };
export default withStyles(s)(Subscription);
