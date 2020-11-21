// Dependencies
const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const checkAuthStatus = require("../../utils/checkAuthStatus");
const mongojs = require("mongojs");
const { mongo } = require("mongoose");

// Request without an id
router
  .route("/trips")
  .get((req, res) => {
    db.Trip.find()
      .then((trips) => {
        res.json(trips);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("THERE WAS AN ERROR FINDING THE TRIPS");
      });
  }) // end of get()
  .post((req, res) => {
    const loggedInUser = checkAuthStatus(req);
    if (!loggedInUser) {
      return res.status(401).send("MUST LOGIN FIRST!");
    }

    db.Trip.create({
      city: req.body.city,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      users: [loggedInUser.id],
    })
      .then((trip) => {
        db.User.findOneAndUpdate(
          { _id: mongojs.ObjectId(trip.users[0]) },
          { $push: { trips: trip._id } },
          (err, data) => {
            if (err) {
              console.log("error");
              res.send(err);
            } else {
              res.send(data);
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("SOMETHING WENT WRONG CREATING YOUR TRIP");
      });
  });
//end of post()

router.route("/trips/:id").put((req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("MUST LOGIN FIRST!");
  }

  db.Trip.findOneAndUpdate(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    {
      $set: {
        report_doc: req.body.report_doc,
        itinerary: req.body.itinerary,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.route("/trips/dates/:id").put((req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("MUST LOGIN FIRST!");
  }

  db.Trip.findOneAndUpdate(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    {
      $set: {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.route("/trips/add/:id").put((req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("MUST LOGIN FIRST!");
  }
  db.User.findOne({
    email: req.body.newMember,
  }).then((result) => {
    // res.json(result);
    // console.log(result)
    db.Trip.findOneAndUpdate(
      { _id: mongojs.ObjectId(req.params.id) },
      { $push: { users: [result._id] } },
      { new: true }
    ).then((trip) => {
      console.log(trip.users[trip.users.length - 1]);
      // res.json(trip);
      db.User.findOneAndUpdate(
        { _id: mongojs.ObjectId(trip.users[trip.users.length - 1]) },
        { $push: { trips: trip._id } },
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(data);
          }
        }
      );
    });
  });
});

router.route("/trips/:id").delete((req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("MUST LOGIN FIRST!");
  }
  db.Trip.findOne({
    _id: mongojs.ObjectId(req.params.id),
  }).then((trip) => {
    if (trip.users.includes(loggedInUser.id)) {
      db.Trip.remove({
        _id: mongojs.ObjectId(trip._id),
      })
        .then((delTrip) => {
          res.json(delTrip);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("SOMETHING WENT WRONG WITH DELETING THIS TRIP");
        });
    } else {
      return res
        .status(401)
        .send("YOU MUST BE A MEMBER OF THIS TRIP TO DELETE IT");
    }
  });
});

// Request with an id
// router.route("/trips/:id")
//     .get((req, res) => {
//         db.Trip.findById(req.params.id)
//             .populate('users')
//             .then(result => res.json(result))
//             .catch(err => res.status(422).json(err));
//     }) // end of get()
//     .put((req, res) => {
//         db.Trip.findOneAndUpdate( {_id: req.params.id}, req.body)
//             .then( result => res.json(result._id) )
//             .catch(err => res.status(422).json(err));
//     }) // end of put()
//     .delete((req, res) => {
//         db.Trip.findById(req.params.id)
//             .then(result => result.remove())
//             .then(result => res.json(result._id))
//             .catch(err => res.status(422).json(err));
//     }) // end of delete()

module.exports = router;
