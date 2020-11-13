// Dependencies
const router = require("express").Router();
const db = require("../../models");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find(req.query)
            .sort({ _id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        db.User.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }); // end of post()

// Request with an id
router.route("./:id")
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