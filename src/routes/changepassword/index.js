import React from 'react';
import Changepassword from './Changepassword';
import Expirederror from '../expirederror/Expirederror';
import { host, apihost} from '../../config';
var status = false ;
var message;
var link=`http://${host}/forgotpass`;


export default {

  path: '/changepassword',

  async action({query}, {path}) {

    var email = query.userEmail;
    var code = query.code;
    console.log("Email ID:" + email);
    var startdate = new Date();
    var body = await checkCode(code, email);

    var enddate = new Date();
    var difftime = enddate.getTime()-startdate.getTime();
    console.log("Execution Time:"+ difftime);
    if ( status )     
     {
        return <Changepassword email={email} passCode={code} />;
     }
      
    else
      {

        if ( body = 'expired')
          message = "Passcode Expired. To get new passcode Click Here";
        else
          message = " Passcode not available"
        return <Expirederror message={message} redirectlink={link} message1='Click Here'/>;
      }
     

  },

};

function checkCode(code, email) {
  var request = require('request');
  console.log('Check Code - calling API');
  var url = `http://${apihost}/getCode?code=` +code+'&userEmail='+email;
  console.log("Checkcode - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Checkcode - Response from API' + body);
      

      if ( body == 'true')
          status = true;
      else
          status = false;
     resolve(body);
    }
    else {
      status = false;
      console.log("checkCode -API Server not running: "+error);
      return reject(error);
    }
    console.log("Checkecode - Returning from API call")
  });

 });
 
}





