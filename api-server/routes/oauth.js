const express = require('express');
const passport = require('../middleware/passport');
const jwt = require('../util/jwt');

const router = express.Router();

require('dotenv').config();

/* Starts with oauth/ */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_SERVER_URL,
  }),
  function(req, res) {
    if (req.user) jwt.issueNewToken(req, res);
    return res.redirect(process.env.CLIENT_SERVER_URL);
  },
);

// jwt 해석
router.post('/google/verify', function(req, res) {
  if (req.body.userToken) return res.json(jwt.decodeJwt(req.body.userToken));
  return res.json({});
});

module.exports = router;
