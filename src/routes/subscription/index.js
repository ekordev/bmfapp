

import React from 'react';

import Subscription from './Subscription';
import { apihost } from '../../config';
import {getSessionid} from '../../scripts/util';

export default {

  path: '/subscription',

  async action({query}, {path}) {
     var provideremail = query.email

     if ( sessionid === undefined || sessionid == '')
      {
        var body = await getSessionid();
        console.log("Sessionid: "+body);
        return <Login sessionid = {body}/>
      }        
      else
       {
          var subid = Math.floor(1000000 + Math.random() * 9000000);
          return <Subscription  email={provideremail} id={subid}/>;
       }
}

};