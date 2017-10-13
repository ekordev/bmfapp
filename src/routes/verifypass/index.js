
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { apihost, host } from '../../config';
import {getSessionid, checkSessionid} from '../../scripts/util';

var request = require('request');

var res;
var userEmail;
var password;
var validLogin=false;
var url;
var page;
var status=false;
var sessionid;
var name;
export default {

  path: '/verifypass',

  async action({query}, {path} ) {

    console.log("inside the verifypass");
   
    userEmail = query.usernameOrEmail;
    password = query.password;
    sessionid = query.sessionid;
    console.log("User Email: "+userEmail);
    console.log("Password:"+ password);
    console.log("SessionId: "+sessionid);
    //var sessionbody = await checkSessionid(sessionid);
    //console.log("Session Exist: "+sessionbody);
    if ( sessionid === undefined || sessionid == '')
       {
         var newsessionid = await getSessionid();
         console.log("inside the if");
         return <Login sessionid = {newsessionid}/>
       }
    

    url = `http://${apihost}/checklogin?usernameOrEmail=` + userEmail + '&password=' + password;
    
    validLogin = await verifylogin(url);
    console.log("Result from API call: "+status);
     if ( status == 'true') {
      var loginres = await loginactivity();
      var body = await SaveSessionData();
      console.log(" Going to Home Page");
      var bookinglist = await getBookingData();
      var usertype = 'customer';
      return <Home sessionid={sessionid} email={userEmail} bookinglist={bookinglist} usertype={usertype}/>;
    }

    else {
      var message = "Invalid username or passowrd";
      console.log(" Invalid Credential return to Login Page");
      return  <Login sessionid={sessionid} message={message}/>;
    } 

  }
};

function verifylogin(url)
{
  console.log("URL -- veriylogin: "+url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body);
          var resobj = JSON.parse(body);
          console.log("Response Object: "+resobj);
          console.log("Customer Name: "+ resobj.name);
          if ( resobj.name != undefined)
          {
            status = 'true';
            name = resobj.name;
            console.log("Name: ",body.name);
          }
          else
          {
            status = false;
            console.log("Error Message "+resobj.status);
          }
          resolve(body);
        }
        else {
          console.log("Server not responding");
          status = false;
          return reject(error);
        }

     console.log("ValidLogin status: " + status);
    });
  });
}

function SaveSessionData() {

  console.log('calling API - SaveSessionData method');
  var url = `http://${apihost}/addSession`;
  console.log("URL: " + url);
  var createdate = new Date();
  var data = { 
  email: userEmail, 
  sessionid: sessionid, 
  creationdate: createdate
};
console.log("Data: "+data);
return new Promise(function(resolve, reject) {
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveSessionData Response from API (body)' + body);

      if (body == 'true')
        status = true;
        resolve(body);
      
    }
    if (error) {
      console.log("Error in storing Session data");
      status = false;
      return reject(error);
    }

  });
 
  console.log('returning');
   });
}

function getBookingData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/getBookingHistory?email=`+userEmail;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getBookingData Response from API (body)' + body);
      resolve(body);    
    }
    else
    {
      console.log("Error Object: "+body.status);
      return reject(error);
    }

  });

  });
}


function loginactivity()
{
  var url = `http://${apihost}/storelogindetails`;
  console.log("URL -- veriylogin: "+url);
  var createdate = new Date();
  var data = { 
  email: userEmail, 
  sessionid: sessionid, 
  logintime: createdate,
  logouttime: ' ',
  name: name
};
  return new Promise(function(resolve, reject) {
    request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('loginactivity function - Response from API' + body)
          
          resolve(body);
        }
        if (error) {
          console.log("Error in updating logout activity");
          status = false;
          return reject(error);
        }

     console.log("Store Login activity status: " + validLogin);
    });
  });
}


