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
        <Redirect from="/" to="/cources" exact/>
        <Route path="/cources/:courceId" component={CoursesList} exact />
        <Route path="/cources" component={CoursesList} exact />
        <Redirect from="/cources" to="/cources"/>

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
