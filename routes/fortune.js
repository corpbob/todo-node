child_process = require('child_process');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var fortune = child_process.execSync('fortune');
  res.send(fortune.toString() + '\n');
});

module.exports = router;
