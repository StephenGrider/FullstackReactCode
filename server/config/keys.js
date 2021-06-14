// module.exports = {
//   googleClientID: '548271082756-krvo7o9n25mpfd71e3k2g7rahlk7olo4.apps.googleusercontent.com',
//   googleClientSecret: 'LNtorf92cZqqVtxAniyo2PLT',
//   mongoURI: 'mongodb+srv://ffjabbari:15pishyy@emaily-dev.x7ckf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   cookieKey: 'fredman'
// };
process.env.NODE_ENV = 'dev';
console.log('===>ENV:::', process.env.NODE_ENV);
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  module.exports = require('./dev');
}