import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import CoursesList from './containers/CoursesList';
import StudentsList from './containers/StudentsList';
import {initApp} from './store/actions';

import './App.scss';

const mapDispatchToProps = (dispatch) => {
  return {    
    initApp: () => dispatch(initApp()),
  }
};

const App = ({initApp}) => {
  useEffect(initApp, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/" to="/courses" exact/>
        <Route path="/courses/:courseId" component={CoursesList} exact />
        <Route path="/courses" component={CoursesList} exact />
        <Redirect from="/courses" to="/courses"/>

        <Route path="/students/:studentId" component={StudentsList} exact />
        <Route path="/students" component={StudentsList} exact />
        <Redirect from="/students" to="/students"/>

        <Route path="/404" exact render={() => <p>Error 404: page not found</p>} />
        <Redirect from="/" to="/404"/>
      </Switch>
      <Footer />
    </div>
  );
}

export default connect(null, mapDispatchToProps)(App);
