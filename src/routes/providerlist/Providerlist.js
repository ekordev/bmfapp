/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Providerlist.css';

const title = 'Service Provider Search';


function Providerlist({providerlist, cateringProviderlist, customeremail, sessionid, bookingid}, context) {
  //context.setTitle(title);
  
   var providerdata = JSON.parse(providerlist);
   console.log("catering Provider List: "+cateringProviderlist);
   var cateringproviderdata;
   if (cateringProviderlist != undefined )
    cateringproviderdata = JSON.parse(cateringProviderlist);

   console.log("Provider Data: "+providerlist);

   if ( cateringProviderlist === undefined )
   {
     return ( 
     <div className={s.root}>
      <div className={s.container}>
        
        <h1>Select Provider near by you</h1>
        <div>
        <form name="form1" method="post"  action="linkprovider" >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Select</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>
          <tbody>
         
           { providerdata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="provideremail" value={obj.email} /> </td>
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
         <input type="hidden" name="customeremail"  value={customeremail} />
         <input type="hidden" name="sessionid"  value={sessionid} />
         <input type="hidden" name="bookingid"  value={bookingid} />
         <button   className={s.button}  type="submit" >
             Submit
         </button>
        </div>
         </form>
        </div>
      </div>                     
    </div>
  );
   }
   else
   {
    return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Service Provider Search</h1>
        <p>Select Provider near by you</p>
        <div>
        <form name="form1" method="put"  action="linkprovider" >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Select</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>
          <tbody>
         
           { providerdata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="provideremail" value={obj.email} /> </td>
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

         <div className={s.formGroup}>
        <table>
        <caption>Select Catering Provider</caption>
          <thead>
          <tr>
          <th>Select</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>
          <tbody>
         
           { cateringproviderdata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="cateringprovideremail" value={obj.email} /> </td>
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
         <input type="hidden" name="customeremail"  value={customeremail} />
         <input type="hidden" name="sessionid"  value={sessionid} />
         <input type="hidden" name="bookingid"  value={bookingid} />
         <button   className={s.button}  type="submit" >
             Submit
         </button>
        </div>
         </form>
        </div>
      </div>                     
    </div>
  );
   }

}

Providerlist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerlist);
