const User = require("../models/User")

exports.getUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        res.status(200).json({
            users: users
        })
        .catch(err => console.log(err));
    })
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }
    })
    .catch(err => console.log(err));
}

exports.createUser = (req, res, next) => {
    const {name, email} = req.body;
    
    User.create({
        name,
        email
    })
    .then(resp => {
        console.log("Created User");
        res.status(201).json({
            message: "User created successfully",
            user, resp
        })
    })
    .catch(err => console.log(err));
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const {name, email} = req.body;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.name = name;
        user.email = email;

        return user.save();
    })
    .then(result => {
        res.status(200).json({
            message: "User updated",
            user: result
        })
    })
    .catch(err => console.log(err));
}

exports.deleteUser = (req, res, next) => {
    const userId = req.param.userId;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        return User.destroy({
            where: {
                id: userId
            }
        });
    })
    .then(result => {
        res.status(200).json({
            message: "User deleted!"
        })
    })
    .catch(err => console.log(err));
}