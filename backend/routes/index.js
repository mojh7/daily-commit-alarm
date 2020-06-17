var express = require('express');
var router = express.Router();


router.get('/', (req, res) => res.json({username:'asd'}));
router.get('/group', (req, res) => res.json({username:'dev group. !@#'}));

module.exports = router;
