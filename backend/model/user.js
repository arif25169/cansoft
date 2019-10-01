const user = require('express').Router();

module.exports = {

    // Get all the userlist
    get: (req, res) => {
        let query = "SELECT * FROM `userlist` ORDER BY id ASC";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', response: err });
            }
            return res.status(200).json({ message: '', response: result });
        });
    },

    // get one user by user Id
    view: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `userlist` WHERE id = " + id + "";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', response: err });
            }
            if (result.length > 0) {
                return res.status(200).json({ message: '', response: result });
            }
            else {
                return res.status(400).json({ message: 'Record not found.', response: err });
            }
        });
    },

    // create user
    create: (req, res) => {
        let name = req.body.name;
        let address = req.body.address;
        let email = req.body.email;
        let active = req.body.active;
        let categoryQuery = "SELECT * FROM `userlist` WHERE name = '" + name + "'";
        db.query(categoryQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', response: err });
            }
            if (result.length > 0) {
                return res.status(200).json({ message: 'user already exists.', response: '' });
            }
            else {
                let query = "INSERT INTO `userlist` (name, address, email, active) VALUES ('" +
                    name + "', '" + address + "', '" + email + "', '" + active + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error.', response: err });
                    }
                    return res.status(200).json({ message: 'Added successfully.', response: '' });
                });
            }
        });
    },

    // update user
    update: (req, res) => {

        let name = req.body.name;
        let address = req.body.address;
        let email = req.body.email;
        let active = req.body.active;
        let id = req.body.id;
        let categoryQuery = "SELECT * FROM `userlist` WHERE id = '" + id + "'";

        db.query(categoryQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', response: err });
            }
            if (result.length == 0) {
                return res.status(400).json({ message: 'user not found.', response: '' });
            }
            else {
                let query = "UPDATE `crud`.`userlist` SET `name`='" + name + "', `address`='" + address + "', `email`='" + email + "', `active`='" + active + "' WHERE id='" + id + "'";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error.', response: err });
                    }
                    return res.status(200).json({ message: 'Updated successfully', response: '' });
                });
            }
        });
    },

    // delete user form database
    delete: (req, res) => {

        let id = req.body.id;
        console.log(req.body)
        let categoryQuery = "SELECT * FROM `userlist` WHERE id = '" + id + "'";

        db.query(categoryQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', response: err });
            }
            if (result.length == 0) {
                return res.status(400).json({ message: 'user not found.', response: '' });
            }
            else {
                let query = "DELETE FROM `userlist` WHERE id='" + id + "'";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error.', response: err });
                    }
                    return res.status(200).json({ message: 'Deleted successfully.', response: '' });
                });
            }
        });
    }
}
