// (async function() {
//   await require('./reload');
//   await require('./case1');
//   await require('./case2');
//   await require('./scenario1');
//   await require('./scenario2');
// })();

require('module-alias/register');
require('./case1');
require('./case2');
require('./case3');
require('./scenario1');
require('./scenario2');
require('./scenario3');
require('./scenario4');