import React, { Component } from 'react';
import Router from './component/route';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import * as actionCreators from './actions/actionCreators';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

var type = require('./actions/types');

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

class App extends Component {


  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <Router/>
      </div>
      </ApolloProvider>
    );
  }
}

function mapStateToProps(state) {

   return { user : state.user  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
