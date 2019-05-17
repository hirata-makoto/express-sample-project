const Models = require('../models/models')
const Login = require('../lib/login')

exports.doGetUser = (req, res, next) => {
    const options = {
        where: {id : 1}
    }

    Models.Employee.findByAll(options)
        .then((result) => {
            console.log('Model', result)
            res.render('../views/index.pug', { users: result })
        })
        .catch((err) => {
            console.log(err)
            res.render('../views/index.pug', {})
        })
}
