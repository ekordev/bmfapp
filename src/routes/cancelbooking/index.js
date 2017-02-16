import React from 'react';
import Cancelbooking from './Cancelbooking';
import bookinglist from '../bookinglist/bookinglist';
import {getSessionid} from '../../scripts/util';
import { host, apihost } from '../../config';
var sessionid='';


var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to login'
var status = true;
var email;
var phone;
var providermobile;
var providermail;
var sessionid;
var id;

export default {

path: '/cancelbooking',

 async action({query}, {path}) {
    console.log("Query String - index.js - Cancelbooking: " + JSON.stringify(query));
    message = 'Sucessfully canceled  the Event';
    sessionid = query.sessionid;
    href = href=`http://${host}/home?sessionid=`+sessionid+'&email='+email;
    message1 = 'Click here to Home Page.';
    return <Cancelbooking message={message} redirectlink={href} message1={message1} sessionid = {sessionid} />;
   
  },

};

