const { Pool} = require('pg/lib');

const pool = new Pool({
     user: 'mewbmzuljlgpxw',
     host:'ec2-54-164-22-242.compute-1.amazonaws.com',
     database:'d7iops1p830gmg',
     password:'cc67fc9d02b40023f2b79d095d35d17548141b02d25b0a156e0f4e1797cef85c',
     post:5432,

     
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool;