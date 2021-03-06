const {User, ROLES} = require('../models')

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Có lỗi! Tên người dùng sớm đã được sử dụng!"
            })
            return
        }
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Có lỗi! Email sớm đã được sử dụng!"
                })
                return
            }
            next()
        })
    })
}
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};


module.exports = {checkDuplicateUsernameOrEmail,
    checkRolesExisted}
