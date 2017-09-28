import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Searchprovider.css';

const title = 'Service Provider Search';


function Searchprovider({providerlist, customeremail, sessionid}, props, context) {
  //context.setTitle(title);
  
   var providerdata = JSON.parse(providerlist);
   var size = providerdata.length;
   console.log("No. of providers: "+size);
   var message = ' ';
   if ( size == 0 )
     message = "No provervider for this search Criteria";

   console.log("Provider Data: "+providerdata);
    return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Service Provider Search</h1>
        
        <div>
        <form name="form1" method="put"  action="home" >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>
          <tbody>
         
           { providerdata.map((obj, index) => (
          <tr key={index}>
            <td>{obj.email}</td>
            <td> {obj.firstname}</td>
            <td> {obj.lname} </td>
            <td> {obj.address}</td>
            <td> {obj.city}</td>
            <td>{obj.phone}</td>
          </tr>
           ))}
           </tbody>
        </table>
        </div>
            
         <div >
         <br></br>
         <input type="hidden" name="email"  value={customeremail} />
         <input type="hidden" name="sessionid"  value={sessionid} />
          <p>{message}</p>
          <button className={s.button}  value="submit" type="submit" >
              Home Page
            </button>
        </div>
         </form>
        </div>
      </div>                     
    </div>
  );


}

Searchprovider.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Searchprovider);
