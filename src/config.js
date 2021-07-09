export default {
  oidc: {
    // clientId: '0oatjthnpG95NR1Na5d6',  // localhost:8080
    clientId:'0oavpnyyg9sLED2bd5d6',    // Heroku preview app
    issuer: 'https://dev-53342887.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
  }
}
