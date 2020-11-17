// Dependencies
const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const config = require("../../config/auth.config.js");
const authjwt = require("../../middleware");
const jwt = require("jsonwebtoken");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find({})
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

// Sign in
router.route("/users/signin").post((req, res) => {

    // Find user by email
    db.User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            });
            res.status(200).json({
                id: user._id,
                email: user.email,
                accessToken: token
            });
        });
});

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