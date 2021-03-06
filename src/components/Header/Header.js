

import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './bmf.png';

function Header() {
  //console.log("HTTP QUERY: "+query);
  return (
    <div className={s.root}>
      <div className={s.container}>        
        <Link className={s.brand} to="/">
          <img src={logoUrl} width="38" height="38"  alt="BMF" />
          <span className={s.brandTxt}>Dream True Solutions</span>
        </Link>
        <Navigation className={s.nav} />
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
//export default withStyles(Header,s);
