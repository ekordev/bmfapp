

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CustomerHeader.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './bmf.png';
import logoutUrl from './logout.jpg';

function CustomerHeader({sessionid}) {
  //console.log("HTTP QUERY: "+query);
  var logoutlink = "/logout?sessionid="+sessionid;
  return (
    <div className={s.root}>
      <div className={s.container}>   
      <div className={s.wrapper}> 
      <div className={s.div}>
       <div className={s.item1}>    
        <Link className={s.brand} to="/">
          <img src={logoUrl} width="38" height="38"  alt="BMF" />
          <span className={s.brandTxt}>Dream True Solutions</span>
        </Link>
      </div>
      </div>
      <div className={s.div}>
        <div className={s.item2}>    
         <span>Last Login</span>
        </div>
      </div>
      <div className={s.div}>
        <div className={s.item3}>    
        <Link className={s.brand} to={logoutlink}>
          <img src={logoutUrl} width="38" height="38"  alt="BMF" />
        </Link>
        </div>
        </div>        
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(CustomerHeader);
