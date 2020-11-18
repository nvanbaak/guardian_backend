// Dependencies
const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuthStatus = require("../../utils/checkAuthStatus");

// Request without an id
router.route("/users")
    .get((req, res) => {
        db.User.find().then(dbUsers => {
            res.json(dbUsers)
        }).catch(err => {
            console.log(err);
            res.status(500).end();
        })
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
    .then(foundUser => {
        if (!foundUser) {
            return res.status(404).send("USER NOT FOUND!");
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            const userTokenInfo = {
                email: foundUser.email,
                id: foundUser._id,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                position: foundUser.position
            }
            const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, {expiresIn:"2h"});
            return res.status(200).json({token: token})
        }
        else {
            res.status(403).send("WRONG PASSWORD!")
        }
    })
});

router.get("/userInfo", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    console.log(loggedInUser);

    if (!loggedInUser) {
        return res.status(401).send("INVALID TOKEN")
    }
    db.User.findOne({
        email: loggedInUser.email
    })
    .populate("trips")
    .then(dbUser => {
        res.json(dbUser)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("AN ERROR OCCURRED PLEASE TRY AGAIN LATER");
    })
})

// Request with an id
// router.route("/users/:id")
//     .get((req, res) => {
//         db.User.findById(req.params.id)
//             .populate('trips')
//             .then(result => res.json(result))
//             .catch(err => res.status(422).json(err));
//     }) // end of get()
//     .put((req, res) => {
//         db.User.findOneAndUpdate( {_id: req.params.id}, req.body)
//             .then( result => res.json(result._id) )
//             .catch(err => res.status(422).json(err));
//     }) // end of put()
//     .delete((req, res) => {
//         db.User.findById(req.params.id)
//             .then(result => result.remove())
//             .then(result => res.json(result._id))
//             .catch(err => res.status(422).json(err));
//     }) // end of delete()

module.exports = router;