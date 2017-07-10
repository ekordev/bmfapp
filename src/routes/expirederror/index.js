import React from 'react';
import Expirederror from './Expirederror';
import Login from '../login/Login';
import { host, apihost} from '../../config';

var message = 'Thanks for visiting our website. You have Sucessfully Logged out '
var message1 = 'Click here to login';
var href = `http://${host}/login`;
var status;
var sessionid;

export default {

  path: '/expirederror',

 async action({query}, {path}) {
    sessionid = query.sessionid;
    console.log("Expirederror - index.js - Sessionid: "+sessionid);
    var body = await deleteSession();
    console.log("Session deleted");
    return <Expirederror message={message} redirectlink={href} message1={message1} />;
    //return <Login />;
   
  },

};


