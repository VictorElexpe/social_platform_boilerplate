const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = function(req, res, next) {
    const saltRounds = 10;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        User.findOrCreate({
            where: {email: email},
            defaults: {
                username: username,
                email: email,
                password: hash
            }
        })
        .then(([user, created]) => {
            if(created == true) {
                req.session.userId = user.id,
                res.app.locals.user = user.dataValues,
                next()
            } else {
                res.send('User alredy in database')
            }
        })
        .catch(err => console.log(err))
    })
}

exports.login = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {        
        if (user == null) {
            res.send('There\'s no user with this email in the database');
        } else {
            const hashedPassword = user.dataValues.password;
            bcrypt.compare(password, hashedPassword, function(err, result) {
                if(result == true) {                                         
                    req.session.userId = user.id,
                    req.app.locals.user = user.dataValues,  
                    next()                 
                } else {
                    res.send('Wrong password')
                }
            })
        }
    })
}

exports.dashboard = function(req, res) {
    res.render('dashboard', { user: req.app.locals.user });
}