/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Savecustomer from './Savecustomer';
import Login from '../Login';
import { apihost } from '../../config';

var message = 'Sucessfully Registered. ';
var redirectlink = '<a href="http://'+apihost+'/login" >Click here to login</a>'
var status = true;
var fn;
var ln;
var address;
var email;
var phone;
var zipcode;

export default {

  path: '/savecustomer',

  action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    path = '/';
    fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;
    email = query.email;
    saveCustomerData(query);
    if (!status) {
      message = 'Error in Saving Customer Data';
      redirectlink = '<a href="http://'+apihost+'/register" >Click here to Register.</a>';
    }
    return <Savecustomer message={message} />;
    //return <Login />;
  },

};

function saveCustomerData(data) {
  var request = require('request');
  //console.log("Inside storePasscode method email: " + email);
  // console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/addNewCustomer`;
  console.log("URL: " + url);
  request.post(url, {form:  data}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside saveCustomerData Response from API (body)' + body);

      if (body == 'true')
        status = true;
    }
    else {
      console.log("Error in storing customer data");
      status = false;
    }


  });
console.log('returning');
}
