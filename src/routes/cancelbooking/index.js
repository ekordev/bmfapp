import React from 'react';
import Cancelbooking from './Cancelbooking';
import bookinglist from '../bookinglist/bookinglist';
import Login from '../Login';
import { host, apihost, smsAPIKey } from '../../config';
var request = require('request');

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
   // phone = query.mobile;
    email = query.email;
    id = query.bookingid;
   // phone = query.mobile;
    console.log("Email: "+email);
    console.log("Customer Mobile: "+phone);

    var bookingrec = JSON.parse(await getBookingRecord());
    console.log("booking Record: "+bookingrec);
    providermobile = bookingrec[0].providerphone;
    phone = bookingrec[0].mobile;
    console.log("Customer Mobile: "+phone);
    providermail = bookingrec[0].provideremail;

    console.log("Provider Phone: "+providermobile);
    console.log("Provider Email: "+providermail);

    sessionid = query.sessionid;
    //console.log("Sessionid - index.js - Cancelbooking "+sessionid);

    if ( sessionid === undefined || sessionid == '')
       {
         var sessionbody = await getSessionid();
         return <Login sessionid = {sessionbody}/>
       }        
      
       
    var body = await Cancelevent();
    console.log("Calling SendEmail");
    var mail = await sendEmail();
   // console.log("Calling sendSMS");
    //var sms = await sendSMS();
    console.log("Body: "+body);
    if (!status) {
      message = 'Unable to cancelling  the Event';
      href = `http://${host}/`;
      message1 = 'Click here to Register.';
      
    }
    else
    {
      message = 'Sucessfully canceled  the Event';
      href = href=`http://${host}/home?sessionid=`+sessionid+'&email='+email;
      message1 = 'Click here to Home Page.';
    }
   return <Cancelbooking message={message} redirectlink={href} message1={message1} sessionid = {sessionid} />;
  },

};

function Cancelevent() {

  console.log('calling API - SavebookingData method');
  var url = `http://${apihost}/cancelBooking?id=`+id;
  console.log("URL: " + url);

return new Promise(function(resolve, reject) {
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside Cancelbooking Response from API (body)' + body);

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
  var mobiles = phone+','+providermobile;
  console.log("Mobiles: "+mobiles);
  var SMSmessage = 'We cancelled your booking with id '+id+', booking please login to view the details';
  var url = `http://${apihost}/sendSMS?authkey=`+ smsAPIKey+'&mobiles='+ mobiles +'&message='+SMSmessage+'&sender=DTSBMF&route=4&country=91';
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

  var subject = "Your booking for the event with id: "+id+" has been cancelled";
  var message = "<b>Your booking for the event Cancelled as per your requst. Thank you for the booking and We continue to provide our best service. ";
  var formdata = { 
  tomail: email+' ,'+providermail, 
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
