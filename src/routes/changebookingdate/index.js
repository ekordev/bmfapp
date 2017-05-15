import React from 'react';
import Changebookingdate from './Changebookingdate';
import Login from '../login/Login';
import { host, apihost, smsAPIKey, SMSmessage } from '../../config';
import {getSessionid} from '../../scripts/util';
var request = require('request');

var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to login'
var status = true;
var changeddate;
var sessionid;
var id;
var email;

export default {

path: '/changebookingdate',

 async action({query}, {path}) {
    console.log("Query String - index.js - Changebookingdate: " + JSON.stringify(query));
    sessionid = query.sessionid;
    console.log("Sessionid - index.js - Changebookingdate "+sessionid);


     if ( sessionid === undefined || sessionid == '')
       {
         var sessionbody = await getSessionid();
         return <Login sessionid = {sessionbody}/>
       }        
      
     id = query.bookingid;
    console.log("Booking Id: "+id);
    changeddate = query.newdate
   
   
       
    var body = await Changedate();
    /*console.log("Calling SendEmail");
    var mail = await sendEmail();
    console.log("Calling sendSMS");
    var sms = await sendSMS();
    console.log("Body: "+body);*/
    if (!status) {
      message = 'Unable to Change booking date  the Event';
      href = `http://${host}/home`;
      message1 = 'Click here to Register.';
      
    }
    else
    {
      message = 'Sucessfully changed booking date for  the Event';
      href = `http://${host}/home?sessionid=`+sessionid+'&email='+email;
      message1 = 'Click here to Home Page.';
    }
   return <Changebookingdate message={message} redirectlink={href} message1={message1} sessionid = {sessionid} />;
  },

};

function Changedate() {

  console.log('calling API - SavebookingData method');
  var url = `http://${apihost}/changedate?id=`+id+'&date='+changeddate;
  console.log("URL: " + url);

return new Promise(function(resolve, reject) {
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside Changebookingdate Response from API (body)' + body);

      if (body == 'true')
        status = true;
      else status = false;
        resolve(body);
        //sendSMS();
      //var result = await sendEmail();
    }
    if (error) {
      console.log("Error in storing customer data");
      status = false;
      return reject(error);
    }

  });
 
  console.log('returning');
   });
}

async function sendSMS() {
  console.log('calling API - sendSMS method');
  
  var url = `http://${apihost}/sendSMS?authkey=`+ smsAPIKey+'&mobiles='+ phone +'&message='+SMSmessage+'&sender=DTSBMF&route=4&country=91';
  console.log("URL: " + url);
   return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendSMS - Response from API (body)' + body);

   if (error) {
      console.log("Error in Sending SMS");
      status = false;
      return reject(error);
    }

  if (body == 'true')
        status = true;
        resolve(body)
    }
    
      });
   });
}


function sendEmail() {
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your booking for the event in BMY";
  var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> ";
  var formdata = { 
  tomail: email, 
  subject: subject, 
  message: message
};
  
  //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
  console.log("Data: "+formdata);
  return new Promise(function(resolve, reject) {
  request.post(url, { form: formdata }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendEmail - Response from API (body)' + body);

      if (body == 'true')
        resolve(body)
        status = true;
    }
    if (error) {
      console.log("Error in Sending Mail");
      status = false;
      return reject(error);
    }

  });
   });
}


function getSessionid() {
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
 
}

function getBookingRecord() {
  var request = require('request');
  console.log('getBookingRecord - linkbooking - calling API');
  var url = `http://${apihost}/getbookingrec?email=`+email+'&bookingid='+id;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getBookingRecord - linkbooking - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getBookingRecord - linkbooking -API Server not running: "+error);
      return reject(error);
    }
    console.log("getBookingRecord - Returning from API call")
  });

 });
 
}