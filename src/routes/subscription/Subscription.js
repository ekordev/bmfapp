/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subscription.css';

const title = 'Customer Message Subscription';

function Subscription({email, id}, context) {
  context.setTitle(title);
  console.log("email: "+email);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="post" action="savesubscription" >
          
          <div className={s.formGroup}>
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
              Your valuable Feedback
            </label>
            <input  className={s.input} type = "date" name="feedback" placeholder="Enter your feedback">
    </input>
    <label className={s.label} htmlFor="Channel">
              Where to deliver message
            </label>
            <input  className={s.input} type = "date" name="feedback" placeholder="Enter your feedback">
        </input>
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

Subscription.contextTypes = { setTitle: PropTypes.func.isRequired };
export default withStyles(s)(Subscription);
