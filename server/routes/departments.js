var express = require('express')
var router = express.Router()
var pool = require('../main/db')


//get all information of department table
router.get('/get/departments', async (req, res) => {
  
   const { rows } = await pool.query(`SELECT * FROM "hrManagement".departments `)
   res.send(rows)
   console.log(rows)
    })





module.exports = router