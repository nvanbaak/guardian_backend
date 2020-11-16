// Dependencies
const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find(req.query)
            .sort({ _id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        // assign req.body to new variable
        let newUser = req.body;
        // hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) throw err;
            // Store in new user variable
            newUser.password = hash;
            // create new user using new variable
            db.User.create(newUser)
                .then(result => res.json(result))
                .catch(err => res.status(422).json(err));
        });
    }); // end of post()

// Request with an id
router.route("/users/:id")
    .get((req, res) => {
        db.User.findById(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .put((req, res) => {
        db.User.findOneAndUpdate( {_id: req.params.id}, req.body)
            .then( result => res.json(result._id) )
            .catch(err => res.status(422).json(err));
    }) // end of put()
    .delete((req, res) => {
        db.User.findById(req.params.id)
            .then(result => result.remove())
            .then(result => res.json(result._id))
            .catch(err => res.status(422).json(err));
    }) // end of delete()

module.exports = router;