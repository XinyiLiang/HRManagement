var express = require('express')
var router = express.Router()
var pool = require('../main/db')


//get all information of employees table
router.get('/get/employees', async (req, res) => {
  
    const { rows } = await pool.query(`SELECT * FROM "hrManagement".employees `)
    res.send(rows)
    console.log(rows)
     })

    //user login with valid empid and password
router.post('/get/userLogin', (req, res, next ) => {
  
    console.log("empid: " + req.body.empid);
    console.log("password: "+req.body.password);

    const empid = req.body.empid;
    const password = req.body.password;

    console.log(empid);
    console.log(password);
    pool.query(`SELECT * FROM "hrManagement".employees WHERE "empid" = $1 and "password" = $2`, [ empid,password ],
    
              (q_err, q_res) => {
                     
                    if(q_err) return next(q_err);
                    res.json(q_res.rows);
                    console.log(JSON.stringify(q_res.rows));
     
    });

  })

  //check login employee with inputed empid
  router.post('/get/LoginEmpCheckId', (req, res, next ) => {
    
    const empid = req.body.empid;
    pool.query(`SELECT * FROM "hrManagement".employees WHERE "empid" = $1`, [ empid],
              (q_err, q_res) => {
                    if(q_err) return next(q_err);
                    res.json(q_res.rows);
     
    });

  })

  // get employee by ID
  router.get('/get/getEmployee/:empid', async (req, res) => {
    const empid  = req.params.empid;
    const { rows } = await pool.query('SELECT * FROM "hrManagement".employees WHERE "empid" = $1 ', [empid]);
    res.send(rows[0]);
  })

  // get employee title information
  router.get('/get/getEmployeeInfo/:empid', async (req, res) => {
    const empid  = req.params.empid;
    const { rows } = 
    await pool.query(
      'SELECT e.empID, e.empfname, e.emplname,e.phone, e.email, e.gender, e.hire_date, d.deptName,s.title \
      FROM "hrManagement".employees e, "hrManagement".dept_employees de, "hrManagement".departments d, "hrManagement".salaries s \
      WHERE  e.empid = $1 \
      AND e.empid = s.empid \
      AND de.empid = e.empid \
      AND de.deptid = d.deptid \
       AND de.to_date IS NULL \
      AND s.to_date IS NULL  ', 
      [empid]);
    res.send(rows[0]);
  })

  // get employee manager information
  router.get('/get/getEmployeeManager/:empid', async (req, res) => {
    const empid  = req.params.empid;
    const { rows } = await pool.query(
      `SELECT e.empid, e.emplname, e.empfname, \
      (SELECT CONCAT(m.empfname, ' ', m.emplname ) AS manager \ 
       FROM "hrManagement".employees m where dm.empid = m.empid), \
       dm.empid AS mID \ 
      FROM "hrManagement".employees e, "hrManagement".departments d, \
      "hrManagement".dept_employees de, "hrManagement".dept_manager dm \
      where  e.empid = $1 \
       AND e.empid = de.empid \
      AND d.deptid = de.deptid \
      AND dm.deptid = d.deptid \
      AND de.to_date IS NULL \
      AND de.to_date IS NULL;` , [empid]);
    res.send(rows[0]);
    
  })

 

  //update employee contact information
  router.put('/put/UpdateEmpContact/:empid', (req, res, next) => {
    
    const empid = req.params.empid;
    const email = req.body.newEmail;
    const phonenumber = req.body.newPhone;
    
    pool.query(`UPDATE "hrManagement".employees SET  email = $2, phone = $3
                WHERE  empid = $1`,  [ empid,email,phonenumber ],

                (q_err, q_res) => {
                  
                  if(q_err) return next(q_err);
                               
                    //res.send(q_res);
                    res.json(q_res.rows);
          })
    
  })


//get  all employees of a specific department
router.get('/get/getDeptEmployees/:empid', (req, res, next) => {
    
  const empid = req.params.empid;
  
  pool.query(`SELECT distinct e.empid, e.emplname, e.empfname, e.empphone, e.email, e.gender, d.deptname, sa.title
  from "hrManagement".employees e, "hrManagement".dept_employees de, "hrManagement".salaries sa, "hrManagement".departments d
  where de.deptid = 
  (select distinct de.deptid 
   from "hrManagement".dept_employees de 
   where de.empid = $1)
   and e.empid = de.empid
   and e.empid = sa.empid
   and de.deptid = d.deptid
   and sa.to_date is null`,  [ empid],

              (q_err, q_res) => {
                
                if(q_err) return next(q_err);
                             
                  //res.send(q_res);
                  res.json(q_res.rows);
        })
  
})



//get to do list of a specific department
router.get('/get/getEmpToDoList/:empid', (req, res, next) => {
    
  const empid = req.params.empid;
  

  pool.query(`SELECT * from "hrManagement".todolist
              WHERE empid = $1`,  [ empid],

              (q_err, q_res) => {
                
                if(q_err) return next(q_err);
                             
                  //res.send(q_res);
                  res.json(q_res.rows);
        })
  
})


router.post('/put/addnewlist/:empid', (req, res, next) => {
    
  const empid = req.params.empid;
  const list_title =  req.body.listTitle ; //"\'\{" + req.body.listTitle +"\}\'"
  const list_content = req.body.listContent   ;

  pool.query(`INSERT  INTO "hrManagement".todolist
  (empid, list_title, list_content)
VALUES ( $1,  ARRAY[$2], ARRAY[$3])`,  [ empid, list_title, list_content], //

              (q_err, q_res) => {
                
                if(q_err) return next(q_err);
                             
                  //res.send(q_res);
                  res.json(q_res.rows);
        })
  
})


// delete one list 

router.delete('/delete/deleteOneList/:empid/:id', (req, res, next) => {
    
  const empid = req.params.empid;
  const id =  req.params.id ; //"\'\{" + req.body.listTitle +"\}\'"
  
  pool.query(`DELETE FROM "hrManagement".todolist
  WHERE empid=$1 AND id=$2`,  [ empid, id], //

              (q_err, q_res) => {
                
                if(q_err) return next(q_err);
                             
                  //res.send(q_res);
                  res.json(q_res.rows);
        })
  
})



module.exports = router