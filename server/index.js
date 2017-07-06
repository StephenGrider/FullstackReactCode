const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// clientID 964808011168-29vqsooppd769hk90kjbjm5gld0glssb.apps.googleusercontent.com
// clientSecret KnH-rZC23z4fr2CN4ISK4srN
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
