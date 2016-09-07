

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/about">About</Link>
      <span className={s.spacer}>|</span>
      <Link className={s.link} to="/contact">Contact</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link } to="/login">Customer Log in</Link>
      <span className={s.spacer}>|</span>
      <Link className={s.link } to="/providerlogin">Service Provider Login</Link>
       <span className={s.spacer}>|</span>
      <Link className={cx(s.link, s.highlight)} to="/register">Customer Sign up</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to= "/serviceprovider">Service Provider Registration</Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
