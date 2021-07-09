export default {
  oidc: {
    // clientId: '0oa16g5fu4XzOkCvI5d7',  // localhost:8080
    clientId:'0oa16fzkzjrmMHlMn5d7',    // Heroku production app
    issuer: 'https://dev-56986132.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
  }
}
