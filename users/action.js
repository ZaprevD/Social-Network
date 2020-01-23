const query = require("./query");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Post } = require("../models");
require("dotenv").config();
const timestamp = require('time-stamp');
getAllUsers = async (req, res) => {
    try {
        let data = await query.getAllUsersQuery();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


getSpecificUser = async (req, res) => {
    try {
        let data = await query.getSpecificUserQuery(req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

loginUser = async (req, res) => {
    let data = await query.getSpecificUserQuery(req.body.Email);
    let dbUser = data[0];
    if (dbUser !== undefined) {
        let match = bcrypt.compareSync(req.body.Password, dbUser.Password);
        if (match) {
            let currentUser = new User(dbUser.Id, dbUser.First_Name, dbUser.Last_Name, dbUser.Email);
            let token = jwt.sign({ currentUser }, process.env.SECRET, { expiresIn: "2h" });
            res.status(200).send(token);
        } else {
            res.status(401).send("Wrong Password");
        }
    } else {
        res.status(404).send("User does not exists");
    }
}



registerUser = async (req, res) => {
    try {
        let data = await query.getAllUsersQuery();
        let found = data.some(element => {
            return element.Email === req.body.email
        });
        if (!found) {
            let hash = bcrypt.hashSync(req.body.password, 10);
            await query.registerUserQuery(req.body, hash);
            res.status(200).send("Registered");
        } else {
            res.status(402).send("account with this email adress alredy exists");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



changePicture = async (req, res) => {
    try {
        await query.changePictureQuery(req.body.imgUrl, req.body.userId);
        res.status(200).send("Picture Changed");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getImageUrl = async(req, res) => {
    try{
        let url = await getImageUrlQuery(req.params.userId);
        res.status(200).send(url[0]);
    }catch(error){
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllUsers, registerUser, loginUser,
     changePicture, getImageUrl
}