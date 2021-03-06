import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Providerhome.css';
import Link from '../../components/Link';
import cx from 'classnames';

const title = 'Welcome to World of Opporunity';
const user = 'Customer';

function Providerhome({ sessionid,  bookinglist, email,  usertype }, context) {
  context.setTitle(title);
  context.setUser(user);
 // context.getUser('user');
  var logoutlink = "/providerlogout?sessionid="+sessionid;
  var updateEmail = "/changeprovideremail?sessionid="+sessionid+"&email="+email;
  var updatePhone = "/changeproviderphone?sessionid="+sessionid+"&email="+email;
  var bookingdata = JSON.parse(bookinglist);
  var size = bookingdata.length;
  console.log("Size of the booking List: "+size);
  if ( size == 0)
  {
  return (
  <div className={s.cards} >
     <div className={s.card} >
      <header>
        <h2>Search Provider</h2>
      </header>
      <br/>
      <br/>
       <form name="searchform" method="get" action="searchprovider" >
      <input type="text" id="category" name="category" />
      
      <br/>
      <br/>
      <input type="radio" name="searchterm" value="pincode" />Pincode
      <br/>
      <input type="radio" name="searchterm" value="city" />City
      <br/>
      <button className={s.button}    value="Search" type="submit" >
              Search
            </button>
       <input id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
             < input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
     </form>         
    </div>

    <div className={s.card}>
    <header>
        <h2>Managing Profile</h2>
      </header>
      <Link className={s.link} to={updateEmail}>Change E-mail</Link>
      <Link className={s.link} to={updatePhone}>Change Mobile No</Link>
      <Link className={s.link} to="/addnewservice">Add New Service</Link>
     <br/>
            <Link className={s.link} to={logoutlink} >Logout</Link>
            
      <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
      <input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
    </div>
    
    <div className={s.card}>
    <header>
        <h2>Booking History</h2>
      </header>
      <div> 
      <p className={s.p}><b> No booking history available</b> </p>
    </div>
      
       </div> 
    
     </div>
         
  );
  }
  else
  {
  return (
    //<div className={s.root}>
     //<div className={s.container}>
    //   <h1>{title}</h1>
       
    <div className={s.cards} >
     <div className={s.card} >
      <header>
        <h2>Search Provider</h2>
      </header>
      <br/>
      <br/>
       <form name="searchform" method="get" action="searchprovider" >
      <input type="text" id="category" name="category" />
      
      <br/>
      <br/>
      <input type="radio" name="searchterm" value="pincode" />Pincode
      <br/>
      <input type="radio" name="searchterm" value="city" />City
      <br/>
      <button className={s.button}    value="Search" type="submit" >
              Search
            </button>
       <input id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
             < input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
     </form>         
    </div>

    <div className={s.card}>
    <header>
        <h2>Managing Profile</h2>
      </header>
      <Link className={s.link} to={updateEmail}>Change E-mail</Link>
      <Link className={s.link} to={updatePhone}>Change Mobile No</Link>
      <Link className={s.link} to="/contact">Add New Service</Link>
     <br/>
            <Link className={s.link} to={logoutlink} >Logout</Link>
            
      <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
      <input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
    </div>
    
    <div className={s.card}>
    <header>
        <h2>Booking History</h2>
      </header>
      <form name="form1" method="get" action="managebooking" >
    
    <table>
        <caption>Your Booking</caption>
          <thead>
          <tr>
          <th>Select</th><th>Booking ID</th><th>Booking Date</th><th>Event Date</th><th>Event</th><th>Customer E-mail</th><th>Customer Mobile</th><th>Status</th>
          </tr>
          </thead>
          <tbody>
         
           { bookingdata.map((obj, index) => (
                   
          <tr key={index}>
            <td><input type="radio" name="bookingid" value={obj.bookingid} checked /> </td>                
            <td> {obj.bookingid}</td>
            <td> {obj.dateofbooking}</td>
            <td> {obj.functiondate} </td>
            <td> {obj.eventtype} </td>
            <td> {obj.email} </td>
            <td>{obj.mobile}</td>
            <td> {obj.status}</td>            
          </tr>
           ))}
           </tbody>
        </table>
        <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
             < input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
              <input type="hidden" name="usertype" value={usertype} />
        <br/>
        <br/>
        <input type="radio" name="manage" value="cancel" checked />Cancel<br/>
        <input type="radio" name="manage" value="close"  />Close Booking<br/>
        
        <button  value="change" type="submit" >
         submit
       </button>
        </form>
       </div> 
    
     </div>
         
  );
  }
}

Providerhome.contextTypes = { setTitle: PropTypes.func.isRequired, setUser: PropTypes.func.isRequired };

export default withStyles(s)(Providerhome);
