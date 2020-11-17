// Dependencies
const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find(req.query)
            .sort({ _id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        db.User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10),null)
        })
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }); // end of post()

// Request with an id
router.route("./users/:id")
    .get((req, res) => {
        db.User.findById(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .put((req, res) => {
        db.User.findOneandUpdate( {_id: req.params.id}, req.body)
            .then( result => res.json(result) )
            .catch(err => res.status(422).json(err));
    }) // end of put()
    .delete((req, res) => {
        db.User.findById(req.params.id)
            .then(result => result.remove())
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }) // end of delete()


// Signin post request
router.route("/users/signin")
    .post((req,res) => {
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

module.exports = router;