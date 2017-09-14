import React from 'react';
import Savesubscription from './Savesubscription';
import Login from '../Login';
import { apihost, host } from '../../config';
var request = require('request');

var message = 'Your Subscription Sucessfully Registered. <a href="http://'+apihost+'/login" >Click here to login</a>';
var status = true;
var email;
var message = 'Thanking your for your registering Subscription. '
var href ;
var message1= 'Click here for home page';
var password;

export default {
 
  path: '/savesubscription',

 async action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    var customeremail = query.email;
    var sessionid = query.sessionid;
    var result = await SaveSubscriptionData(query);
    console.log("Status -- SaveSubscriptionData: "+status);
    
    href=`http://${host}/home?sessionid=`+sessionid+'&email='+customeremail;;
    
    if (!status) {
      message = 'Error in Error in Saving Subscription Data';
     
      message1= 'Click here to Register'
    }
    return <Savesubscription sessionid={sessionid} message={message}  message1={message1}  href={href} />;
    
  },

};

function SaveSubscriptionData(data) {
  var request = require('request');
  //console.log("Inside storePasscode method email: " + email);
  // console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/saveSubscription`;
  console.log("URL: " + url);

  return new Promise(function(resolve, reject) {
  request.post(url, {form:  data}, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveSubscriptionData Response from API (body)' + body);
      if (body == 'true')
      {
        status = true;        
     }
    else {
      console.log("Error in storing Subscription data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}
