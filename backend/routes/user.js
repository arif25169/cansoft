const router = require('express').Router();

const user = require('../model/user');

router.route('/user')
    .get(user.get)
    .put(user.update)
    .delete(user.delete)
    .post(user.create);

router.route('/user/:id')
    .get(user.view)

module.exports = router;