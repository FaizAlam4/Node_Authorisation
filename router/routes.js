const { Router } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const route = express.Router();
const auth = require('../schema.js')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const aut = require("../auth.js");

route.use(express.urlencoded({ extended: true }))

route.use(express.json());



route.get('/',(req,res)=>{
    res.write("Endpoints:\n");
  
    res.end("Thanks")
})


route.post('/register', (request, response) => {




    bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
        console.log('hashedPassword', hashedPassword)

        //create a new user instance and collect the data
        const user = new auth({
            email: request.body.email,
            password: hashedPassword
        })

        //save the user
        user.save().then((result) => {
                response.status(201).send({
                    message: "User Created Successfully",
                    result
                })
            }).catch((error) => {
                response.status(500).send({
                    message: "Error creating user",
                    error
                })
            })

    }).catch((error) => {
        response.status(500).send({
            message: "Password was not hashed successfully",
            error
        })
    })
   


})

route.post("/login", (request, response) => {
    //check if the email tha user enters omn login exists or not

    auth.findOne({ email: request.body.email }).then((usr) => {
            console.log(usr)

            bcrypt.compare(request.body.password, usr.password)
                .then((passwordCheck) => {
                    console.log(passwordCheck);

                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: 'Passwords do not match'
                        })
                    }

                    // create a jwt token
                    const token = jwt.sign({
                        userId: usr._id,
                        userEmail: usr.email
                    }, "RANDOM-TOKEN", { expiresIn: "24h" })

                    //return a success response

                    response.status(200).send({
                        message: "Login is successsfull",
                        email: usr.email,
                        token,
                    })
                })
                .catch(err => {
                    response.status(400).send({
                        message: 'Passwords do not match',
                        err
                    })
                })

        }).catch((err) => {
            response.status(404).send({
                message: "Email not found",
                err
            })
        })

})

route.post('/privatendpoint',aut,(req,res)=>{
console.log(req.user);
    res.json({
        message: "You are authorised to access this route"
    })
})




module.exports = route;
