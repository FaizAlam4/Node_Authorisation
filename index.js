const mongoose=require('mongoose')
const express=require('express');
const app=express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

let url="mongodb+srv://faiz:qkmSCS2bPMZyN1ay@cluster0.wrfi9jl.mongodb.net/cipherschool?retryWrites=true&w=majority";

mongoose.connect(url).then(()=>{
console.log("Successfully connected!")
}).catch((err)=>console.log(err));


app.use(require('./router/routes.js'));

app.listen(4000,()=>console.log("Server started at 4000!"));

