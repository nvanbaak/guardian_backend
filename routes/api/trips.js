// Dependencies
const router = require("express").Router();
const db = require("../../models");

// Request without an id
router.route("/trips")
    .get((req, res) => {
        db.Trip.find(req.query)
            .sort({ _id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        db.Trip.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }); // end of post()

// Request with an id
router.route("/trips/:id")
    .get((req, res) => {
        db.Trip.findById(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .put((req, res) => {
        db.Trip.findOneAndUpdate( {_id: req.params.id}, req.body)
            .then( result => res.json(result._id) )
            .catch(err => res.status(422).json(err));
    }) // end of put()
    .delete((req, res) => {
        db.Trip.findById(req.params.id)
            .then(result => result.remove())
            .then(result => res.json(result._id))
            .catch(err => res.status(422).json(err));
    }) // end of delete()

module.exports = router;