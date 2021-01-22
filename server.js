const express = require('express');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'employees'
    }
  });

//  console.log(postgres.select('*').from('employees'))

const app = express();
app.use(express.json())
app.use(cors())




app.get('/',(req,res) => {
    db('employees').then(users => {
        if (users.length) {
            res.json(users);
        } else {
            res.status(400).json('user not found')
        }
    })
})

app.put('/addemployee',(req,res) => {
    const {email,name,id,job_title,date_of_birth,department} = req.body;
    if (!email || !name || !id || !job_title || !date_of_birth || !department) {
        return  res.status(400).json('incorrect form submission')
     }
     db('employees')
     .returning('*')
     .insert({
         email:email,
         name:name,
         id:id,
         job_title:job_title,
         date_of_birth:date_of_birth,
         department:department
     }).then(employee => res.json(employee[0]))

})

app.put('/editemployee',(req,res) => {
    const {email,name,id,job_title,date_of_birth,department} = req.body;
    if (!email || !name || !id || !job_title || !date_of_birth || !department) {
        return  res.status(400).json('incorrect form submission')
     }
     db('employees')
     .returning('*')
     .where({id:id})
     .update({
         email:email,
         name:name,
         job_title:job_title,
         date_of_birth:date_of_birth,
         department:department
     }).then(employee => res.json(employee[0]))

})




app.listen(process.env.PORT || 3000,() => {
    console.log("working")
})