const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// https://console.developers.google.com
// client id: 1078055607998-7guji31g81t4mpe2bmpr981fftt9l4pu.apps.googleusercontent.com
// client secret: VWHkdS6I0jKfzSjEX_EoChok
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
