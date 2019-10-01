const routes = require('express').Router();
const user = require('./user');


routes.use(user);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Api Is Working' });
});

module.exports = routes;