import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from "react-router-dom";

import ContCreatePage from './controlers/con_create_page';
import ContNavBar from './controlers/con_navbar';
import ContMainPage from './controlers/con_main_page';
import ContUserLogPage from './controlers/con_user_log_page';



class App extends Component {
  render() {
    return (
      <div className={"App"}>
        <div>
          <h3>
            ЗАДАЧНИК
         </h3>
        </div>
        <ContNavBar />

        <Switch>
          <Route exact path='/todo/' component={ContMainPage} />
          <Route path='/todo/create' component={ContCreatePage} />
          <Route path='/todo/userlog' component={ContUserLogPage} />
        </Switch>

      </div>
    );
  }
}

export default App;
