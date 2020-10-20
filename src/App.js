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
    console.log(script);
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

  firebase.auth().onAuthStateChanged((user) => {
    // console.log(window.gapi);
    // Make sure there is a valid user object
    //____________________________________________________________
    console.log('AUTH STATE CHANGE TRIGGERED');

    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        clientId: process.env.REACT_APP_GMAIL_FIREBASE_CLIENT_ID,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
        ],
        scope: 'https://mail.google.com/',
      })
      .then(function () {
        // const GoogleAuth = window.gapi.auth2.getAuthInstance();
        // if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        //   GoogleAuth.signIn();
        // }
        // console.log(
        //   'balls',
        //   window.gapi.auth2.getAuthInstance().isSignedIn.get()
        // );
        // Listen for sign-in state changes.
      });
  });
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
