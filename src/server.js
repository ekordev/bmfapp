import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
//import UniversalRouter from 'universal-router';
import { match } from 'universal-router';
import { resolve } from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from '../node_modules/assets'; // eslint-disable-line import/no-unresolved
import { port, auth, analytics, mongodbUrl } from './config';
var mongodb = require('mongodb');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var fs = require('fs-extra'); 


/*const debug = require('debug')('bmfapp')  
coname = 'bmfapp';
debug('booting %s', name);*/
 
const app = express();
app.use(fileUpload());

app.use(session({
  secret: '1234567890QWERTY',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'll';

//a
// Register Node.js middleware
// -----------------------------------------------------------------------------
//app.use(bodyParser);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
app.use(passport.initialize());

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.post('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
   // let astrofile;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', user: '', css: '', body: '', entry:'assets.main.js'  }; //assets.main.js
    //var sess = req.session;
   //console.log("Path Post:"+req.path);
   //console.log("Query Post:"+JSON.stringify(req.body));
   var astrofile;
   if ( req.files )
    {
      console.log("File Data: ", req.files.astroFile.data);
      console.log("Files Name: " + req.files.astroFile.name);
      astrofile =   req.files.astroFile;
      
    }
   
  // console.log("Http Request: "+req.busboy);
  /* if(req.busboy != undefined) {
        req.busboy.on("file", function(fieldName, fileStream, fileName, encoding, mimeType) {
            console.log("File Name: "+filename);
        });
        return req.pipe(req.busboy);
    }*/
    
    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

   
    
    await resolve(routes, {
      path: req.path,
      query: req.body,
      files : astrofile,
           
      context: {
        insertCss: styles => css.push(styles._getCss()), // eslint-disable-line no-underscore-dangle
        setTitle: value => (data.title = value),
        setUser: value => (data.user = value),
        setMeta: (key, value) => (data[key] = value),
        getUser: (key) => (data[key])       
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });
    //res.header("Content-Type",'multipart/form-data');
    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', user: '', css: '', body: '', entry:'assets.main.js'  }; //assets.main.js
    //var sess = req.session;
   // console.log("Path get:"+req.path);
    //console.log("Query get:"+JSON.stringify(req.query));
    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }
    
   if ( req.query.user != undefined )

    {
      data['user'] = req.query.usertype; 
      console.log(" User - Server.js : "+data.user);
    }
    
    await resolve(routes, {
      path: req.path,
      query: req.query,
      
      
      context: {
        insertCss: styles => css.push(styles._getCss()), // eslint-disable-line no-underscore-dangle
        setTitle: value => (data.title = value),
        setUser: value => (data.user = value),
        setMeta: (key, value) => (data[key] = value),
        getUser: (key) => (data[key])        
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });
    
    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
