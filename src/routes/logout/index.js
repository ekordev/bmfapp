import React from 'react';
import Logout from './Logout';
import logout from '../logout/logout';
import { host, apihost} from '../../config';

var request = require('request');
var message = 'Thanks for visiting our website. You have Sucessfully Logged out '
var message1 = 'Click here to login';
var href = `http://${host}/login`;
var status=true;
var sessionid;

export default {

  path: '/logout',

 async action({query}, {path}) {
    sessionid = query.sessionid;
    console.log("Logout - index.js - Sessionid: "+sessionid);
    var logoutres = await logoutactivity();
    console.log("Logout Response: "+logoutres)
    var body = await deleteSession();
    console.log("Session deleted");
    return <Logout message={message} redirectlink={href} message1={message1} />;
    //return <logout />;
   
  },

};

function deleteSession() {

  console.log('calling API - DeleteSession method');
  var url = `http://${apihost}/deleteSession?sessionid=`+sessionid;
  console.log("URL: " + url);

return new Promise(function(resolve, reject) {
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);

      if (body == 'true')
        status = true;
        resolve(body);
        
    }
    if (error) {
      console.log("Error in deleting session data");
      status = false;
      return reject(error);
    }
     console.log('returning from deleteSession API call');
  });
 
  
   });
}

function logoutactivity()
{
  var url = `http://${apihost}/updatelogouttime`;
  console.log("URL -- loginactivity: "+url);
  var createdate = new Date();
  var data = { 
  sessionid: sessionid, 
  logouttime: createdate
};
  return new Promise(function(resolve, reject) {
    request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('logoutactivity function - Response from API' + body)
           resolve(body);
        }
        if (error) {
          console.log("Error in updating login activity");
          status = false;
          return reject(error);
        }

     console.log("Store logout activity status: " + status);
    });
  });
}