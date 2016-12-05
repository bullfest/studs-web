/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles.css';
import Navbar from '../Navbar'
import * as actions from './actions';
import { loggedIn } from '../../auth';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentDidMount() {
    if(this.props.loggedIn && !this.props.user) {
      this.props.getUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.loggedIn != this.props.loggedIn && !this.props.user) {
      this.props.getUser();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Navbar />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
    fetchingUser: state.getIn(['global', 'fetchingUser']),
    loggedIn: state.getIn(['global', 'loggedIn']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
