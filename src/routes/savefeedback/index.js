import React from 'react';
import Savefeedback from './Savefeedback';
import Login from '../Login';
import { apihost, host } from '../../config';
var request = require('request');

var message = 'Your feedback Sucessfully Registered. <a href="http://'+apihost+'/login" >Click here to login</a>';
var status = true;
var email;
var message = 'Thanking your for your valuable feedback. '
var href =  `http://${host}/login`;
var message1= 'Click here to login';
var password;

export default {

  path: '/savefeedback',

 async action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
   
    var result = await SaveFeedbackData(query);
    console.log("Status -- SaveFeedbackData: "+status);
    
    if (!status) {
      message = 'Error in Error in Saving Feedback Data';
      href = `http://${host}/serviceprovider`;
      message1= 'Click here to Register'
    }
    return <Savefeedback message={message}  message1={message1}  href={href} />;
    
  },

};

function SaveFeedbackData(data) {
  var request = require('request');
  //console.log("Inside storePasscode method email: " + email);
  // console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/storefeedback`;
  console.log("URL: " + url);

  return new Promise(function(resolve, reject) {
  request.post(url, {form:  data}, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveFeedbackData Response from API (body)' + body);
      if (body == 'true')
      {
        status = true;        
     }
    else {
      console.log("Error in storing customer data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}
