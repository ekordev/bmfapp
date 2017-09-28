
import React from 'react';
import LinkProvider from './LinkProvider';
import { host, apihost } from '../../config';
import Login from '../login/Login';
import {getSessionid} from '../../scripts/util';
var request = require('request');

var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to Home Page'
var status = true;
var bookingid;
var bookingtype;
var url;


export default {

  path: '/linkprovider',

async  action({query}, {path}) {

  var sessionid = query.sessionid;
  console.log("Sessionid - index.js - Home "+sessionid);
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }

    console.log("Query String - index.js - linkprovider: " + JSON.stringify(query));
    var provideremail = query.provideremail;
    var customeremail = query.customeremail;
    var cateringprovideremail = query.cateringprovideremail;
    var providerphone;
    
    bookingid = query.bookingid;
    bookingtype = query.bookingtype;
    console.log("Bookingtype index.js - LinkProider  "+bookingtype);
    
    var providerrec = JSON.parse(await getProviderRecord(provideremail));
        console.log("Provider Record: "+providerrec);
    
    
    providerphone = providerrec[0].phone;
    console.log("Provider Phone: "+providerphone);
    if ( cateringprovideremail != undefined)
    {
        var bookingrec = JSON.parse(await getBookingRecord(bookingid));
        console.log("Booking Record: "+bookingrec);
        var cateringproviderrec = JSON.parse(await getProviderRecord(cateringprovideremail));
        console.log("cateringprovider record: "+cateringproviderrec);
        console.log(" Catering Provider Phone: "+cateringproviderrec[0].phone);
        var cateringproviderphone = cateringproviderrec[0].phone;
        bookingrec[0].provideremail=cateringprovideremail;
        bookingrec[0].providerphone= cateringproviderphone;
         delete bookingrec[0]._id;
        console.log(" Booking Record after adding fields: "+JSON.stringify(bookingrec[0]));
       
        var bookingresponse = await SavebookingData(bookingrec[0]);
    } 

    if ( bookingtype != undefined)
      url = `http://${apihost}/updateAstroProviderLink?provideremail=`+provideremail+'&email='+customeremail+'&phone='+providerphone+'&bookingid='+bookingid;
    else
     url = `http://${apihost}/updateProviderLink?provideremail=`+provideremail+'&email='+customeremail+'&phone='+providerphone+'&bookingid='+bookingid;
    console.log("Link Provider - Provider Email: "+provideremail);
    console.log("Link Provider - Customer Email: "+customeremail);
    console.log("URL: " + url);
    var result = await LinkProviderData(url);
    console.log("Return from LinkProviderData");
    if (!status) {
      message = 'Error in Saving Booking Data';
      href = `http://${host}/booking`;
      message1 = 'Click here to Re-booking';
    }
   else
   {
    // var mail =  sendEmail(customeremail, provideremail, bookingid);
     href=`http://${host}/home?sessionid=`+sessionid+'&email='+customeremail+'&usertype=customer';
   }
      return <LinkProvider message={message} redirectlink={href} message1={message1} sessionid={sessionid}/>;
  },

};

function LinkProviderData(url) {
  var request = require('request');
 // console.log("APIHOST: "+apihost);
  console.log('calling API - LinkProviderData method');
  //console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
   request.put(url, function (error, response, body) {
     if (error) 
     {
      console.log("Error in storing provider data");
      status = false;
     return reject(error);     
     }
     
   if (body == 'true') {
      console.log('Inside LinkProviderData Response from API (body)' + body);      
        status = true;
      resolve(body);      
   }
    
  });
  console.log('returning');
 });
 }
 

function getProviderRecord(email) {
  var request = require('request');
  console.log('getProviderRecord - linkProvider - calling API');
  var url = `http://${apihost}/getProvider?email=`+email;
  console.log("getProviderRecord Method - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getProviderRecord - linkProvider - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getProviderRecord - linkProvider -API Server not running: "+error);
      return reject(error);
    }
    console.log("getProviderRecord - Returning from API call")
  });

 });
 
}

function sendEmail(email, provideremail, bookingid) {
  var request = require('request');-
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your booking for the event in BMY";
  var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> "+bookingid;
  var formdata = { 
  tomail: email+' ,'+provideremail, 
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

function SavebookingData(data) {

  console.log('calling API - SavebookingData method');
  var url = `http://${apihost}/newcateringbooking`;
  console.log("URL: " + url);
  console.log("Booking Record in SavebookingData "+data);
return new Promise(function(resolve, reject) {
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SavebookingData Response from API (body)' + body);

      if (body == 'true')
        status = true;
        resolve(body);
        //sendSMS();
      //var result = await sendEmail();
    }
    if (error) {
      console.log("Error in storing customer data");
      status = false;
      return reject(error);
    }

  console.log('returning');
  });
 
   });
}

function getBookingRecord(bookingid) {
  var request = require('request');
  console.log('getProviderRecord - linkProvider - calling API');
  var url = `http://${apihost}/getbookingrec?bookingid=`+bookingid;
  console.log("getBookingRecord Method - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getProviderRecord - linkProvider - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getProviderRecord - linkProvider -API Server not running: "+error);
      return reject(error);
    }
    console.log("getBookingRecord - Returning from API call")
  });

 });
 
}