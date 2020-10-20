var GoogleAuth; // Google Auth object.
export function initClient() {
  // window.gapi.client
  //   .init({
  //     apiKey: 'YOUR_API_KEY',
  //     clientId: 'YOUR_CLIENT_ID',
  //     scope: 'https://www.googleapis.com/auth/gmail.send',
  //     discoveryDocs: [
  //       'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
  //     ],
  //   })
  //   .then(function () {
  //     GoogleAuth = window.gapi.auth2.getAuthInstance();
  //     // Listen for sign-in state changes.
  //     GoogleAuth.isSignedIn.listen(updateSigninStatus);
  //   });
}
// };

export const checkSignInStatus = (user, accessToken) => {
  // return new Promise((resolve, reject) => {
  //   initGmailClient()
  //     .then((_) => {
  //       const gapi = window.gapi;
  //       gapi.client.setToken({ access_token: accessToken });
  //       console.log('yet another access token', gapi.client);
  //       //         const googleAuthInstance = gapi.auth2.getAuthInstance();
  //       //         console.log('windowgapi', gapi)
  //       //         const isSignedIn = googleAuthInstance.isSignedIn.get();
  //       // console.log(isSignedIn)
  //       //         if (isSignedIn) {
  //       //           // Listen for sign-in state changes.
  //       //           googleAuthInstance.isSignedIn.listen((isSignedIn) => {
  //       //             updateSigninStatus(isSignedIn);
  //       //           });
  //       //           console.log('AUTH_SUCCESS from checkSignInStatus');
  //       //           resolve(googleAuthInstance.currentUser.Ab);
  //       //           console.log(window.gapi.auth2)
  //       //           if(googleAuthInstance.currentUser.le.nt.Wt !== user){
  //       //           signIn();
  //       //         }
  //       //           console.log('user', googleAuthInstance.currentUser)
  //       //         } else {
  //       //           // reject();
  //       //           signIn();
  //       //         }
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
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
