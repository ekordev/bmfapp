

import React from 'react';

import Subscription from './Subscription';
import { apihost } from '../../config';
import {getSessionid} from '../../scripts/util';

export default {

  path: '/subscription',

  async action({query}, {path}) {
     var provideremail = query.email
     return <Subscription  email={provideremail}/>;
}

};