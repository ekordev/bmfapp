
import React from 'react';
import Messagelist from './Messagelist';
import { host, apihost } from '../../config';
import Login from '../login/Login';
import {getSessionid} from '../../scripts/util';


 var sessionid;
 var email;

export default {

  path: '/Messagelist',

 async action({query}, {path}) {

   sessionid = query.sessionid;
   console.log("Sessionid - index.js - Home "+sessionid);

   email = query.email;
   console.log("customer Email: "+email);

   if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }
   var messagedata = await getBookingData();
   console.log("Message Data : "+messagedata);
   
  return <Messagelist Messagedata={messagedata} customeremail={email} sessionid = {sessionid} />;
 
  },

};

function getMessageData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/findmessages?email=`+email;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getBookingData Response from API (body)' + body);
      //Messagelist = body;
     // console.log("Messagelist: "+Messagelist);
      resolve(body);    
    }
    else
    {
      console.log("Error Object: "+error);
      return reject(error);
    }

  });

  });
}

/*function getSessionid() {
  var request = require('request');
  console.log('genSessionid - calling API');
  var url = `http://${apihost}/genSessionid`;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('genSessionid - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("genSessionid -API Server not running: "+error);
      return reject(error);
    }
    console.log("getSessionid - Returning from API call")
  });

 });
 
}*/