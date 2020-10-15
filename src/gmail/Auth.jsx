export const mountScripts = () => {
  

  return new Promise((resolve, reject) => {
    console.log('begun')
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.onload = () => {};
      resolve();
    };
    script.onreadystatechange = () => {
      if (script.readyState === 'complete') script.onload();
      console.log('script started')
    };
    document.body.appendChild(script);
  });
};

export const signIn = () => {
// console.log("window.gpai", window.gapi)
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const initGmailClient = (apiKey, clientId) => {
  var CLIENT_ID = process.env.REACT_APP_GMAIL_CLIENT_ID;
  var API_KEY = process.env.REACT_APP_GMAIL_API_KEY;

  // Array of API discovery doc URLs for APIs
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  // More info: https://developers.google.com/identity/protocols/googlescopes
  var SCOPES = 'https://www.googleapis.com/auth/gmail.send';
  // Scope for Read, send, delete, and manage your email

  const gapi = window.gapi;
  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });

  
};

export const checkSignInStatus = () => {
  return new Promise((resolve, reject) => {
    initGmailClient()
      .then((_) => {
        const gapi = window.gapi;

        const googleAuthInstance = gapi.auth2.getAuthInstance();
        // console.log('windowgapi', googleAuthInstance)
        const isSignedIn = googleAuthInstance.isSignedIn.get();
// console.log(isSignedIn)
        if (isSignedIn) {
          // Listen for sign-in state changes.
          googleAuthInstance.isSignedIn.listen((isSignedIn) => {
            updateSigninStatus(isSignedIn);
          });

          console.log('AUTH_SUCCESS from checkSignInStatus');

          resolve(googleAuthInstance.currentUser.Ab);
          console.log(gapi)
        } else {
          // reject();
          signIn();
        
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Listener for sign-in state
export const updateSigninStatus = (isSignedIn) => {
  if (!isSignedIn) {
    // TODO: react to logged out status
  }
};

export const signOut = () => {
  return window.gapi.auth2.getAuthInstance().signOut();
};
