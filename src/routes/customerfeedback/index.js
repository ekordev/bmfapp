

import React from 'react';

import Customerfeedback from './Customerfeedback';
import { apihost } from '../../config';
import {getSessionid} from '../../scripts/util';

export default {

  path: '/customerfeedback',

  async action({query}, {path}) {
     var provideremail = query.provideremail;
     var customeremail = query.email;
     return <Customerfeedback  email={provideremail} customeremail={customeremail}/>;
}

};