const Models = require('../models/models')

exports.topPage = (req, res, next) => {
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

exports.dashboard = (req, res, next) => {
    // セッションにデータを保持
    req.session.user = {
        aaaa: 'aaaa',
        bbbb: 'bbbb'
    }
    res.render('../views/dashboard.pug', {user: req.user})
}
