const app = require('./server');

app.listen(3001, ()=>{
   console.log('server listening on port '+app.get('port'));
});