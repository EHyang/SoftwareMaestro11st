const app = require('./server');

app.listen(3000, ()=>{
   console.log('server listening on port '+app.get('port'));
});