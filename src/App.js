import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Setting up REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers/rootReducer';
import firebase from './firebase';

// COMPONENTS AND PAGES
import Home from './pages/Home';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

function App() {
  const [gapiReady, setGapiReady] = useState(false);

  function loadGmailApi() {
    const script = document.createElement('script');

    script.onload = () => {
      loadClientWhenGapiReady(script);
    };
    script.src = 'https://apis.google.com/js/client.js';

    document.body.appendChild(script);
  }

  const loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    if (script.getAttribute('gapi_processed')) {
      console.log('Client is ready! Now you can access gapi. :)');
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(process.env.REACT_APP_FIREBASE_API_KEY);
        window.gapi.client.load('gmail', 'v1', () => {
          setGapiReady(true);
        });
      });
    } else {
      console.log("Client wasn't ready, trying again in 100ms");
      setTimeout(() => {
        loadClientWhenGapiReady(script);
      }, 100);
    }
  };

  useEffect(() => {
    loadGmailApi();
  }, []);

  return (
    <Provider store={store}>
      <Header />
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
