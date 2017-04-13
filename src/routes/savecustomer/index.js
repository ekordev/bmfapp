
import React from 'react';
import Savecustomer from './Savecustomer';
import Login from '../Login';
import { host, apihost, smsAPIKey } from '../../config';
var request = require('request');
var SMSmessage = 'Thanks for your Registration. Use your email id for login and password sent to your e-mail';

var message = 'Sucessfully Registered. '
var href = `http://${host}/login`;
var message1 = 'Click here to login'
var status = false;
var fn;
var ln;
var address;
var email;
var phone;
var zipcode;
var password;

export default {

  path: '/savecustomer',

 async action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    
    path = '/';
    fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;
    email = query.email;
    var body = await checkDuplicate(email);
    console.log("Response: "+body);
    if ( status == 'true')
     {
      var customerdata = await saveCustomerData(query);
      console.log("Customerdata: "+customerdata);
      console.log("Status--saveCustomerData: "+status);
      if ( status == 'true')
      {
        password = await getPassword();
        console.log("generated Password: "+password);
        console.log("Status--getPassword: "+status);
        var login = await saveLogin(password);
        console.log("Calling SendEmail");
        var mail = await sendEmail();
        console.log("Calling sendSMS");
        var sms = await sendSMS();   
      }
       
     }
    
      if (!status) {
        message = 'Error in Saving Customer Data';
        href = `http://${host}/register`;

        message1 = 'Click here to Register.';
      }
      console.log("Href: " + href);
      return <Savecustomer message={message} redirectlink={href} message1={message1} />;
  
  }

};

function checkDuplicate(email)
{
  var url = `http://${apihost}/getCustomer?email=`+email;
  console.log("URL: checkDuplicate " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Check duplicate - Response from API' + body);
      
      if ( body == 'true' )
        {
           message = 'Email id already register';
           status = 'false';
        }
      
      else
      {
           console.log("Customer email not exist");
           status='true';
      }
        resolve(body);
    }
    else {
      
      console.log("Check duplicate - Error in getting customer ") + error;
      return reject(error);
    }
  });
  console.log("Checkduplicate -- Returning")
  });
}


function saveCustomerData(data) {
 // var request = require('request');
  console.log('saveCustomerData -- calling API');
  //var request = require('request-promise');
  var url = `http://${apihost}/addNewCustomer`;
  console.log("saveCustomerData -- URL: " + url);

  return new Promise(function(resolve, reject) {
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside saveCustomerData Response from API (body)' + body);

      if (body == 'true') {
        status = true;
       
      }
      resolve(body);
    }
    else {
      console.log("saveCustomerData -- Error in storing customer data");
      status = false;
      return(error);
    }

  console.log('saveCustomerData -- returning from API call');
  });
  
  });
  
}

function getPassword() {
  var url = `http://${apihost}/generatePass?length=6`;
  console.log("getPassword -- URL: " + url);

  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getPassword --  Response from API' + body); 
      status='true';        
      resolve(body);
    }
    else {
      
      console.log("getPassword -- API Server not running: " + error);
      status = 'false';
      return(error);
    }
    console.log('getPassword -- returning from API call');
  });

});
}

function saveLogin(password) {
  var data = { "userEmail": email, "password": password};
  console.log("Data: "+data);
  var url = `http://${apihost}/addcred`;
  return new Promise(function(resolve, reject) {
  request.post(url, { form: data },function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('saveLogin Password - Response from API' + body);
      status = true;
      resolve(body);
    }
    else {
      status = false;
      console.log("saveLoging -API Server not running: ") + error;
      return(error);
    }
  });
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

  var subject = "Your Registration for our service";
  var message = "<b>Thank you for Registeration. </b> <br> <b> Assuring best service. Your password for login is: "+password+"<b> ";
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