
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Post } = require("../models");
require("dotenv").config();
const user = require("../dbModels/user");
// const timestamp = require('time-stamp');


getAllUsers = async (req, res) => {
    try {
        let rawData = await user.findAll({
            attributes: ['First_Name', 'Last_Name', 'Email']
        })
        let clearData = rawData.map(el => {
            return el.dataValues
        })
        return clearData
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getSpecificUser = async (email) => {
    try {
        const dbUser = await user.findAll({
            where: {
                Email: email
            }
        });
        return dbUser[0].dataValues
    } catch (error) {
        console.log(error.message)
    }
}


loginUser = async (req, res) => {
    let dbUser = await getSpecificUser(req.body.Email);
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
        let hash = bcrypt.hashSync(req.body.password, 10);
        await user.create({
            First_Name: req.body.firstName,
            Last_Name: req.body.lastName,
            Email: req.body.email,
            Password: hash
        }).then(() => res.status(200).send("Registered"));
    } catch (error) {
        res.status(500).send(error.message);
    }
}

changePicture = async (req, res) => {
    try {
        await user.update({ Image: req.body.imgUrl },
            {
                where: {
                    Id: req.body.userId
                }
            }
        ).then(res.status(200).send("Changed!"))
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getImageUrl = async (req, res) => {
    try {
        await user.findAll({
            attributes: ["Image"],
            where: {
                Id: req.params.userId
            }
        }).then(url => {
            res.status(200).send(url)
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllUsers, registerUser, loginUser,
    changePicture, getImageUrl
}