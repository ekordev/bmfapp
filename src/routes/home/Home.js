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
import s from './Home.css';
import Link from '../../components/Link';
import cx from 'classnames';

const title = 'Welcom to World of Opporunity';

function Home({ news }, context) {
  context.setTitle(title);
  return (
    <div >
      <Link className={s.link} to="/booking">Home Function</Link>
      
      <Link className={s.link} to="/contact">Astrology</Link>
     <br/>
      <Link className={s.link } to="/">Marriage Services</Link>
      
      <Link className={s.link} to="/register">Catering</Link>
      <br/>
      <span className={s.spacer}> | </span>
      
    </div>
  );
}


Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
