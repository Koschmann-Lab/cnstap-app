export default {
  oidc: {
    // clientId: '0oatjthnpG95NR1Na5d6',
    clientId:'0oavpnyyg9sLED2bd5d6',
    issuer: 'https://dev-53342887.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
  }
}
