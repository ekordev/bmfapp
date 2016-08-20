/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import register from './register';
import savecustomer from './savecustomer'
import content from './content';
import error from './error';
import verifypass from './verifypass'
import forgotpass from './forgotpass'
import changepassword from './changepassword'
import updatepass from './updatepass'

export default {

  path: '/',

  children: [
    home,
    contact,
    login,
    verifypass,
    forgotpass,
    changepassword,
    updatepass,
    register,
    savecustomer,
    content,
    error
  ],

  async action({ next, render, context }) {
    const component = await next();
    
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
