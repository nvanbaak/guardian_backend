// Dependencies
const router = require("express").Router();
const db = require("../../models");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find(req.query)
            .sort({ id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        db.User.find(req.query)
            .sort({ id: 1 })
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }); // end of post()

// Request with an id
// router.route("./:id")
