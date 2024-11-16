const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const EmpModel = require('./Models/Employees')
const { error } = require('console')

const app =  express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/employeedb')
.then(()=>console.log("mongodb commected"))
.catch((err)=>console.log("Mongodb connection error",err));


app.listen(5434,()=>{
    console.log(" Server runnin on port 5434");

});


app.get('/',(req, res)=>{
    EmpModel.find({})
    .then(employee=>res.json(employee))
    .catch(err=> res.status(500).json({error:err.message}));
});

app.post('/createEmp/',(req,res)=>{
    EmpModel.create(req.body)
    .then(employee=>res.status(201).json(employee))
    .catch(err => res.status(400).json({err:err.message}));

});

app.get('/getEmp/:empmail/:emppass',(req ,res)=>{
    const myemail = req.parms.empmail;
    const mypass = req.parms.emppass;
    console.log('Request reveived for:${myemail}');

    EmpModel.find({"Empmail":myemail,"password":mypass})
    .then(employee=>{
        if(!employee){
            return res.status(404).json({error:"User not found"});
        }
        res.json(employee);
          
    })
    .catch(err => res.status(500).json({ error: err.message }));
})

