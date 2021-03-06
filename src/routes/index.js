
import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import search from './searchprovider'
import contact from './contact';
import login from './login';
import register from './register';
import forgotpass from './forgotpass'
import savecustomer from './savecustomer';
import content from './content';
import error from './error';
import verifypass from './verifypass'
import changepassword from './changepassword'
import updatepass from './updatepass'
import serviceprovider from './serviceprovider'
import saveprovider from './saveprovider'
import booking from './booking';
import savebooking from './savebooking'
import providerlogin from './providerlogin'
import providerforgotpass from './providerforgotpass'
import providerchangepassword from './providerchangepassword'
import updateproviderpass from './updateproviderpass'
import linkprovider from './linkprovider'
import verifyproviderlogin from './verifyproviderlogin'
import providerlist from './providerlist';
import logout from './logout';
import bookinglist from './bookinglist';
import cancelbooking from './cancelbooking';
import changebookingdate from './changebookingdate';
import managebooking from './managebooking';
import providerhome from './providerhome';
import providerlogout from './providerlogout';
import changeprovideremail from './changeprovideremail';
import changeproviderphone from './changeproviderphone';
import updateprovideremail from './updateprovideremail';
import updateproviderphone from './updateproviderphone';
import confirmOTP from './confirmOTP';
import cateringbooking from './cateringbooking';
import astrologybooking from './astrologybooking';
import saveastrobooking from './saveastrobooking';
import expirederr from './expirederror';
import customerfeedback from './customerfeedback';
import savefeedback from './savefeedback';
import subscription from './subscription';
import savesubscription from './savesubscription';

export default {

  path: '/',
  

  children: [
    home,
    search,
    logout,
    bookinglist,
    contact,
    login,
    providerlogin,
    providerhome,
    providerlogout,
    verifypass,
    verifyproviderlogin,
    forgotpass,
    changepassword,
    providerforgotpass,
    providerchangepassword,
    changeprovideremail,
    changeproviderphone,
    updatepass,
    updateproviderpass,
    updateprovideremail,
    confirmOTP,
    updateproviderphone,
    register,
    savecustomer,
    serviceprovider,    
    saveprovider,
    customerfeedback,
    savefeedback,
    booking,
    managebooking,
    customerfeedback,
    cancelbooking,
    changebookingdate,
    providerlist,
    savebooking,
    linkprovider,
    cateringbooking,
    astrologybooking,
    saveastrobooking,
    subscription,
    savesubscription,
    content,
    error,
    expirederr,
    
  ],

  async action({ next, render, context }) {
  const component = await next();
  
  console.log("Next Object: "+JSON.stringify(component));
  var usertype = component.props.usertype;
  var sessionid =component.props.sessionid;
  console.log("User Type: "+usertype);
  console.log("Session Id: "+sessionid);
    if (component === undefined) return component;

    if ( usertype != undefined )
    {
    return render(
      <App context={context} usertype={usertype} sessionid={sessionid}>{component}</App>
    );
  }
  else
  {
    return render(
    <App context={context} >{component}</App>
  );
  }
  
  },

};

function getLastloginactivity()
{
  var url = `http://${apihost}/findlogindetails?email=`+userEmail;
  console.log("URL -- veriylogin: "+url);
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
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