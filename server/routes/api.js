const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/meanstack', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Single User
router.get('user/:id', (req, res, next) => {
  connection(db => {
    db.collection('users')
      .find(id)
      .then(user => {
        response.data = user;
        res.json(response)
      })
      .catch(err => {
        sendError(err, res)
      })
  })
})

router.create('/users', (req, res) => {
  connection(db => {
    db.collection('users')
  })
})

module.exports = router;
