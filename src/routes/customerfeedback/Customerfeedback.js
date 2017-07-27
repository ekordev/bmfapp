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
import s from './Customerfeedback.css';

const title = 'Customer Feedback';

function Customerfeedback(props, context) {
  context.setTitle(title);
  console.log("Props: "+JSON.stringify(props))
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="post" action="forgotpass" >
          
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="Provider Name">
              Email:
            </label>
            <input
              className={s.input}
              id="providername"
              type="text"
              name="providername"
              readOnly            
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
