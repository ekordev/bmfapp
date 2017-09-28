/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Link from '../../components/Link';
import cx from 'classnames';
import homeUrl from './homefunction.png';
import astroUrl from './astrology.png';

const title = 'Welcome to World of Opporunity';
const user = 'Customer';

function Home({ sessionid, email, bookinglist, usertype }, context) {
  context.setTitle(title);
  context.setUser(user);
  //context.getUser('user');
  var logoutlink = "/logout?sessionid="+sessionid;
  var bookinglink = "/booking?sessionid="+sessionid+"&email="+email;
  var cateringbookinglink = "/cateringbooking?sessionid="+sessionid+"&email="+email;
  var astrologybookinglink = "/astrologybooking?sessionid="+sessionid+"&email="+email;
  var subscriptionlink = "/subscription?sessionid="+sessionid+"&email="+email;
  var messageslink = "/messages?sessionid="+sessionid+"&email="+email;


  console.log("Astrologybooking Link: "+astrologybookinglink);
  var bookingdata = JSON.parse(bookinglist);
  var size = bookingdata.length;
  console.log("Size of the booking List: "+size);
  if ( size == 0)
   {
    return( 
    <div>
     <div className={s.item1}>
      <header>
        <h2>Search Provider</h2>
      </header>
      <br/>
      <br/>
       <form name="searchform" method="get" action="searchprovider" >
         <label className={s.label} htmlFor="Search">
              Search:
            </label>
      <input type="text" id="category" name="category" />
      <input type="hidden" id="usertype" name="usertype" value={usertype}/>
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
              < input
              id="usertype"
              type="hidden"
              name="usertype"
              value={usertype}
              />
     </form>         
    </div>

    <div className={s.item2}>
    <header>
        <h2>Service Booking for you</h2>
      </header>
      <Link className={s.link} to={bookinglink}>
      <img src={homeUrl} width="38" height="38" align="left" alt="Home Function" />
      <span> Home Function </span>
      </Link>
      <Link className={s.link} to={astrologybookinglink}>
      <img src={astroUrl} width="38" height="38" align="left" alt="Home Function" />
      Astrology</Link>
     <br/>
      <Link className={s.link} to="/">Marriage Services</Link>      
      <Link className={s.link} to={cateringbookinglink}>Catering</Link>
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
       < input
              id="usertype"
              type="hidden"
              name="usertype"
              value={usertype}
              /> 
    </div>
    
    <div className={s.item4}>
    <header>
        <h2>Booking History</h2>
      </header>
      
      <p className={s.p}><b> No booking history available</b> </p>
    </div>

    <div className={s.item3}>
    <header>
        <h2>Message Center</h2>
      </header>
      <Link className={s.link} to={subscriptionlink}>
      <span> Message Subscription </span>
      </Link>
      <Link className={s.link} to={messageslink}>
      </Link>
     </div>
               
    </div> 
    )
   }
  else
  {
  return (
   <div className={s.root}>
    <div className={s.container}>
    
     <div className={s.wrapper}>
       
    <div className={s.div}>
     <div className={s.item1}>
      <header>
        <h2>Search Provider</h2>
      </header>
      <br/>
      <br/>
       <form name="searchform" method="get" action="searchprovider" >
      <input type="text" id="category" name="category" />
      <input type="hidden" id="usertype" name="usertype" value={usertype}/>
      
      <br/>
      <br/>
      <input type="radio" name="searchterm" value="pincode" defaultChecked/>Pincode
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
              < input
              id="usertype"
              type="hidden"
              name="usertype"
              value={usertype}
              />
     </form>         
    </div>
    </div>

    <div className={s.div}>
    <div className={s.item2}>
    <header>
        <h2>Service Booking</h2>
      </header>
      <Link className={s.link} to={bookinglink}>
      <img src={homeUrl} width="38" height="38" align="left" alt="Home Function" />
      <span> Home Function </span>
      </Link>
      <Link className={s.link} to={astrologybookinglink}>
      <img src={astroUrl} width="38" height="38" align="left" alt="Home Function" />
      Astrology</Link>
     <br/>
     <br/>
      <Link className={s.link } to="/">Marriage Services</Link>
      
      <Link className={s.link} to={cateringbookinglink}>Catering</Link>
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
              < input
              id="usertype"
              type="hidden"
              name="usertype"
              value={usertype}
              />
    </div>
    </div>
    
    <div className={s.div}>
    <div className={s.item4}>
    <header>
        <h2>Booking History</h2>
      </header>
      <form name="form1" method="get" action="managebooking" >
    
    <table>
        <caption>Your Booking</caption>
          <thead>
          <tr>
          <th>Select</th><th>Booking ID</th><th>Booking Date</th><th>Event Date</th><th>Event</th><th>E-mail</th><th>Phone</th><th>Status</th>
          </tr>
          </thead>
          <tbody>
         
           { bookingdata.map((obj, index) => (
                   
          <tr key={index}>
            <td><input type="radio" name="bookingid" value={obj.bookingid} defaultChecked /> </td>                
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
              < input
              id="usertype"
              type="hidden"
              name="usertype"
              value={usertype}
              />
        <br/>
        <br/>
        <input type="radio" name="manage" value="cancel" defaultChecked />Cancel<br/>
        <input type="radio" name="manage" value="changedate"  />Changedate<br/>
        <button  value="change" type="submit" >
         submit
       </button>
        </form>
       </div> 
       
       </div >
       <div className={s.div}>
       <div className={s.item3}>
        <header>
        <h2>Message Center</h2>
        </header>
      <Link className={s.link} to={subscriptionlink}>
      <span> Message Subscription </span>
      </Link>
      <Link className={s.link} to={messageslink}>
      Messages for you
      </Link>
     </div>
     </div>
      
     </div>
     </div >
     </div >
        
  );
  }
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired, setUser: PropTypes.func.isRequired };

export default withStyles(s)(Home);
