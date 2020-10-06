import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Setting up REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers/rootReducer';

// COMPONENTS AND PAGES
import Home from './pages/Home';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SignIn from './components/firebase/SignIn';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

function App() {
  return (
    <Provider store={store}>
      <SignIn />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
