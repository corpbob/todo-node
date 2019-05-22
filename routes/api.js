var express = require('express');
var router = express.Router();
var Client = require('pg').Client;

var config = {
  user: 'sampledb', // default process.env.PGUSER || process.env.USER
  password: '3JlnBORxajx1m36Q', //default process.env.PGPASSWORD
  database: 'sampledb', // default process.env.PGDATABASE || process.env.USER
  port: 5432, // default process.env.PGPORT
  host: 'syndesis-db.syndesis.svc'// e.g. postgres://user:password@host:5432/database
}

/* GET users listing. */
router.get('/:id', function(req, res, next) {

console.log('id is ', req.params.id);
const client = new Client(config);
client.connect(function(err){
  sql = 'SELECT * from todo where id = ?';
  params = [req.params.id];

  if(!req.params.id){
    res.send(200);
  }
  client.query('SELECT * FROM todo where id = $1', [ req.params.id ], function(err, result){
  if (err) throw err
  for(var i=0;i<result.rowCount;i++){
    console.log(result.rows[i]);
   }
   res.send(result.rows);
  client.end()
  })

});

  //res.send(fortune.toString() + '\n');
});

router.post('/', function(req, res, next){

  body = req.body;
  console.log(body);
  const client = new Client(config);
  client.connect(function(err){
    client.query('INSERT INTO todo (task, completed) VALUES ($1, $2) RETURNING id', [body.task, body.completed],function(err, result){
    if (err) throw err
     res.send('OK');
    client.end()
    })
  });
  
  //INSERT INTO todo (task, completed) VALUES ($1, $2) RETURNING id
});

module.exports = router;
