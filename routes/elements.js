var express = require('express');
var router = express.Router();

/* GET all element listing. */
router.get('/', function(req,res,next) {
    res.send('ok');
});

/* GET form element listing. */
router.get('/forms', function(req, res, next) {
    res.render('forms');
});

module.exports = router;
