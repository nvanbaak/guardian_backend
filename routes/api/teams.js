const router = require("express").Router();
const db = require("../../models");

// Request without an id
router.route("/teams")
    .get((req, res) => {
        db.Team.find(req.query)
            .sort({ _id: 1 })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }) // end of get()
    .post((req, res) => {
        db.Team.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    }) // end of post()

    // Request with an id
    router.route("/teams/:id")
        .get((req, res) => {
            db.Team.findById(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
        })
        .put((req, res) => {
            db.Team.findOneAndUpdate( {_id: req.params.id}, req.body)
                .then(result => res.json(result._id))
                .catch(err => res.status(422).json(err));
        })
        .delete((req, res) => {
            db.Team.findById(req.params.id)
                .then(result => result.remove())
                .then(result => res.json(result._id))
                .catch(err => res.status(422).json(err))
        })

        module.exports = router