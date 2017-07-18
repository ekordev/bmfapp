

import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setUser: PropTypes.func,
      setMeta: PropTypes.func,
      getUser: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setUser: context.setUser || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
      getUser: context.getUser || emptyFunction,
    };
  }
 
  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {

    //console.log( "this.props: "+this.props);
    var userType = this.props.context.getUser('user');
    //console.log("User Type: "+userType);
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;