
import React from 'react';
import Providerlist from './Providerlist';
import { host, apihost } from '../../config';

 var providerlist;

export default {

  path: '/providerlist',

 async action({query}, {path}) {
   var body = await getProviderData();
   //console.log("Body: "+body);
   var customeremail = query.customeremail;
   console.log("customer Email: "+customeremail);
  return <Providerlist providerlist={providerlist} customeremail={customeremail} />;
 
  },

};

function getProviderData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/searchByType?servicetype=Pooja`;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getProviderData Response from API (body)' + body);
      providerlist = body;
      console.log("Providerlist: "+providerlist);
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
