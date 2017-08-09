
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Astrologybooking.css';
var DatePicker = require("react-bootstrap-date-picker");
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

//import { DateField, Calendar } from 'react-date-picker'

const title = 'New Event Booking';

var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var currentdate = day + '/' + month + '/' + year;


function Astrologybooking({sessionid, bookingid, email, phone}, context) {

  const onChange = (dateString, { dateMoment, timestamp }) => {
  console.log(dateString)
}
 
let date1 = '2017-04-24'

  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form name="form1" method="post" encType="multipart/form-data" action="saveastrobooking" >
          <div className= {s.leftContainer}>
          <input id="status" type="hidden"  value="booked" name="status" />
            <label className={s.label} htmlFor="dateofbooking">
              Date of Booking:
            </label>
            <input
              className={s.input}
              id="dateofbooking"
              type="text"
              name="dateofbooking"
              value={currentdate}
              autoFocus
              readOnly
              />
       
          </div>

          <div >
            <label className={s.label} htmlFor="email">
              <span>E-mail: </span>
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
              value={email}
             readOnly
              />
            <label className={s.label} htmlFor="mobile">
              <span>Mobile Number: </span>
            </label>
            <input
              className={s.input}
              id="mobile"
              type="number"
              name="mobile"
              value={phone}
              readOnly
              />
          </div>

          <div className={s.formGroup} >
            <label className={s.label} htmlFor="">
              Upload Horoscpe:
            </label>
            <input type="file" name="astroFile" />
          </div>
          <div>
            
            <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
            <input
              id="bookingid"
              type="hidden"
              name="bookingid"
              value={bookingid}
              />
               <input
              id="bookingtype"
              type="hidden"
              name="bookingtype"
              value="Astrology"
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}  value="submit" type="submit" >
              Book Event
            </button>
          </div>
        </form>


      </div>
    </div>
  );
}

Astrologybooking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Astrologybooking);
