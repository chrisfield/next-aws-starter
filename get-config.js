const config = () => ({
  "api": {
    "invokeUrl": "https://w53e4hbwre.execute-api.eu-west-1.amazonaws.com/prod"
  },
  "cognito": {
    "REGION": "eu-west-1",
    "USER_POOL_ID": process.env.AWS_COGNITO_USER_POOL_ID,
    "APP_CLIENT_ID": process.env.AWS_COGNITO_APP_CLIENT_ID
  }
});

export default config;
