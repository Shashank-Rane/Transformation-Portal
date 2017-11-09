
const express = require('express');

var path = require('path');

var Transform = require('../models/project')

var router = express.Router();



//get single application //resolved

router.get('/:proj_id/:app_id', (req, res) => {

    Transform.findOne({ "project_id": req.params.proj_id, "applications.application_id": req.params.app_id }, "applications.$", (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            console.log("singlke",docs)
            res.json(docs);
        }
    });
});

//get all projects
router.get('/', (req, res) => {
    Transform.find((err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            console.log("all",docs)
            res.json(docs);
        }
    });
});

//get single project 
router.get('/:proj_id', (req, res) => {
    Transform.find({ project_id: req.params.proj_id }, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            console.log("req", docs)
            res.json(docs);
        }
    });
});


//Get a single movie object by Id
//GET /api/movies/:id
// router.get('/:id', (req, res) => {
//     TaskSchema.findById({ _id: req.params.id }, (err, doc) => {
//         if (err) {
//             console.log(err);
//             res.json({ message: 'Unable to retrieve movie object', error: err });
//         } else {
//             res.json(doc);
//         }
//     });
// });
// router.put('/:id', (req, res) => {
//     TaskSchema.findByIdAndUpdate({ _id: req.params.id },req.body, (err, doc) => {
//         if (err) {
//             console.log(err);
//             res.json({ message: 'Unable to retrieve movie object', error: err });
//         } else {
//             res.json(doc);
//         }
//     });
// });


// Add SINGLE app --do not include  applications: in request body--do not include [] -- app in old project
router.put('/:proj_id', (req, res) => {


    Transform.update({ project_id: req.params.proj_id }, { $push: { applications: req.body } }, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {

            res.json(docs);
        }
    })
})

//edit app

router.put('/:proj_id/:app_id', (req, res) => {


    delete req.body._id
    //why does it rewrite the entire application?
    //why  "Cannot apply $addToSet to a non-array field. Field named 'applications' has a non-array type object when app id is missing??
    //deleting all apps and adding req body????
    //resolved --postionsional operator: {$set:{ "applications.$": req.body}}
    Transform.update({ project_id: req.params.proj_id, "applications.application_id": req.params.app_id }, { $set: { "applications.$": req.body } }, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve app data', error: err })
        }
        else {
            console.log(req.body)
            res.json(docs);

        }
    })
})
// var doc = Transform.children.id(_id);

//     newApp.save((err, doc) => {
//         if (err) {
//             res.json({error: err });
//         }
//         else {
//             res.json({ message: 'Movie details added successfully' });
//         }
//     });
// });

//add scores

//Delete movie by Id
//DELETE /:id
router.delete("/:proj_id/:app_id", (req, res) => {
    Transform.update({ project_id: req.params.proj_id, "applications.application_id": req.params.app_id }, { $pull: { applications: { "application_id": req.params.app_id } } }, (err, doc) => {
        if (err) {
            res.json({ message: "Error in deleting App", error: err })
        } else {
            res.json({ message: "App deleted successfully", movie: doc })
        }
    });
});

router.delete("/:proj_id/:application_id", (req, res) => {
    Transform.update({ project_id: req.params.proj_id }, { $pull: { applications: { "application_id": req.params.application_id } } }, (err, doc) => {
        if (err) {
            res.json({ message: "Error in deleting App", error: err })
        } else {
            res.json({ message: "App deleted successfully", movie: doc })
        }
    });
});
//Add a new description for a movie
// //POST /:id/reviews
// router.post('/:id/reviews', function (req, res) {
//     var query = { $addToSet: { reviews: req.body } }
//     MoviesSchema.findByIdAndUpdate(req.params.id, query, (err, doc) => {
//         if (err) {
//             res.json({ message: "No movie found with mentioned id", error: err });
//         }
//         else {
//             res.json({ message: 'New review added to the movie' });
//         }
//     })
// });


module.exports = router;
/*"name": "MongoError",
        "message": "Cannot apply $addToSet to a non-array field. Field named 'applications' has a non-array type object in the document _id: ObjectId('59e58541a58f2025c8ce0eaa')",
        "driver": true,
        "index": 0,
        "code": 16837,
        "errmsg": "Cannot apply $addToSet to a non-array field. Field named 'applications' has a non-array type object in the document _id: ObjectId('59e58541a58f2025c8ce0eaa')"
    }*/