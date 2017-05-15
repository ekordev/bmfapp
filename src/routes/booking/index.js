

import React from 'react';
import Booking from './Booking';
import Login from '../login/Login';
import { apihost } from '../../config';
import {getSessionid} from '../../scripts/util';

export default {

  path: '/booking',

  async action({query}) {
 
    var date = new Date();
    var currentdate = date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
    console.log("Query String",JSON.stringify(query));
    var sessionid = query.sessionid;
    var email = query.email;
    console.log("Sessionid - index.js - Booking : "+sessionid);

    var customerrec = JSON.parse(await getCustomerRecord(email));
    console.log("booking Record: "+customerrec);
    var customermobile = customerrec[0].phone;
    
    //console.log("Booking Id: "+bookingid);
    
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         console.log("Sessionid: "+body);
         return <Login sessionid = {body}/>
       }        
       else
        {
          var bookingid = Math.floor(1000000 + Math.random() * 9000000);
          return  <Booking sessionid={sessionid} bookingid={bookingid} email={email} phone={customermobile}/>;
        }
        
    
  },

};



function getCustomerRecord(email) {
  var request = require('request');
  console.log('getCustomerRecord - calling API');
  var url = `http://${apihost}/getCustomer?email=`+email;
  console.log("getCustomerRecord - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getCustomerRecord - linkbooking - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getCustomerRecord - linkbooking -API Server not running: "+error);
      return reject(error);
    }
    console.log("getCustomerRecord - Returning from API call")
  });

 });
 
}