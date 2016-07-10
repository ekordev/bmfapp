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
import s from './Register.css';

const title = 'New User Registration';

function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form name="form1" method="get" action="login" >
          <div className={s.formGroup} >
            <label className={s.label} htmlFor="firstname">
              User First Name:
            </label>
            <input
              className={s.input}
              id="firstname"
              type="text"
              name="firstname"
              autoFocus
              />

            <label className={s.label} htmlFor="email">
              <span>User Last Name: </span>
            </label>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"

              />
          </div>

          <div className={s.formGroup} >
            <label className={s.label} htmlFor="email">
              E-mail:
            </label>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              autoFocus
              />
            <label className={s.label} htmlFor="address">
              <span>User Address: </span>
            </label>
            <input
              className={s.input}
              id="email"
              type="text"
              name="email"
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="submit" type="submit" >
              Log in
            </button>

          </div>
        </form>


      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
