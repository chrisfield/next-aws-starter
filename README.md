# Next-AWS starter

A next js app for deployment to now with auth set up using amplify/aws cognito.

## Getting Started

#### prerequsites
For the authentication to work you will need to set up a userpool in aws. This [aws cognito tutorial](https://www.youtube.com/watch?v=EaDMG4amEfk) may be useful if you have not done this before.


#### installation
Clone or download the repo, cd to the root folder, run:
```
npm i
```

In the root folder create a `.env` file with information for your aws congito. This information with be used when the next app runs locally.
```
AWS_COGNITO_USER_POOL_ID="user_pool_id_here"
AWS_COGNITO_APP_CLIENT_ID="app_client_id_here"
```

Repeat the same the '.env.build'. This will be used when the next app is hosted on [now](https://zeit.co/).


#### run locally
'''
npm run dev
'''