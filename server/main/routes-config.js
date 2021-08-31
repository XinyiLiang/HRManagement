var express = require('express')
var router = express.Router();

var departments  = require('../routes/departments');
var employees  = require('../routes/employees');

router.use(departments);
router.use(employees);

//export default router;
module.exports = router;
