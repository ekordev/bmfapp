

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Messagelist.css';

const title = 'Event Messages';


function Messagelist({Messagedata, customeremail, sessionid}, props, context) {
  //context.setTitle(title);
  
   var Messagedata = JSON.parse(Messagedata);  

   console.log("Message Data: "+Messagedata);
    return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>My Message</h1>
        
        <div>
        <form name="form1"  >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Event</th><th>Message</th></tr></thead>
          <tbody>
         
           { Messagedata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="customeremail" value={obj.email} /> </td>
            <td> <input id="email" type="hidden" value={obj.email}/>{obj.email} </td>
            <td> {obj.bookingdate}</td>
            <td> {obj.functiondate}</td>
            <td> {obj.mobile} </td>            
            <td> {obj.status}</td>
            <td> {obj.eventtype}</td>           
          </tr>
           ))}
           </tbody>
        </table>
        </div>
            
         <div >
         <br></br>
         <input type="hidden" name="customeremail"  value={customeremail} />
         <input type="hidden" name="sessionid"  value={sessionid} />
        
        </div>
         </form>
        </div>
      </div>                     
    </div>
  );


}

Booking
Messagelist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Messagelist);
