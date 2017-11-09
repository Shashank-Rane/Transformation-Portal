//importing
var express = require('express')
var md5 = require('md5')
//Importing route
var router = express.Router();
var user = require('../models/user')
var Project = require('../models/project')


//Routes For Admin 

//1.Route for user login
router.post('/login', function (req, res, next) {

    user.find({ username: req.body.username }, (err, data) => {
        if (err) res.json(err)
        var pass = req.body.password;
        var authkey1 = "", role1 = ""
        pass = md5(pass).toString()
        for (var i = 0; i < 4; i++) {
            pass += md5(pass).toString()
        }
        // console.log(pass)
        // console.log(data)
        // console.log({username:data[0].username})
        // console.log(data[0].password)
        if (data[0].password === pass) {
            // console.log("hit")
            var authkey = md5(req.body.username + req.body.password + Math.random())
            user.findOneAndUpdate({ username: req.body.username }, { authkey: authkey }, (err, doc) => {
                if (err) res.status(500).json(err)
                authkey1 = doc.authkey;
                role1 = doc.role
                // console.log(doc.authkey)

                res.status(200).json({ role: role1, authkey: authkey1 })
            })
        }

    })
})


//2.Route for adding user
router.post('/', function (req, res, next) {


    var pass = req.body.password;
    pass = md5(pass).toString()
    for (var i = 0; i < 4; i++) {
        pass += md5(pass).toString()
    }
    var authkey = md5(req.body.username + req.body.password + Math.random())
    var newUser = new user({
        project_name: req.body.project_name,
        user_email: req.body.user_email,
        username: req.body.username,
        password: pass,
        role: req.body.role,
        authkey: authkey
    })

    newUser.save((err, doc) => {
        if (err) res.status(500).json(err)
        else {
            res.status(200).json(doc)
        }
    })

})

// //mapping particular user to a project 
// router.save('/projects/users', function (req, res, next) {
//     Project.aggregate([{
//         $lookup: {
//             from: "users",
//             localField: "project_name",
//             foreignField: "project_name",
//             as: "project_executives"
//         }
//     }], function (err, docs) {
//         if (err) { res.json(err) }
//         else {
//             res.json(docs)
//         }
//     })
// })

//2.Route for updating user
router.put('/users/:id', function (req, res, next) {
    var pass = req.body.password;
    pass = md5(pass).toString()
    for (var i = 0; i < 4; i++) {
        pass += md5(pass).toString()
    }
    var authkey = md5(req.body.username + req.body.password + Math.random())
    obj = {
        project_name: req.body.project_name,
        user_email: req.body.user_email,
        username: req.body.username,
        password: pass,
        role: req.body.role,
        authkey: authkey
    }


    user.findByIdAndUpdate(req.params.id, obj, function (err, doc) {
        if (err) res.status(500).json({ msg: "Unable to edit" })
        else {
            res.status(200).json({ msg: "Successfully edited" })


        }
    })

})

//3.Route for deleting user 
router.delete("/users/:id", function (req, res, next) {

    user.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.status(500).json({ msg: "Unable to delete" })
        else {

            res.status(200).json({ msg: "Successfully Deleted" })

        }
    })

})

//Route for geting specific user by id
router.get("/users/:id", function (req, res, next) {

    user.findById(req.params.id, function (err, doc) {
        if (err) res.status(500).json({ msg: "Unable to Find" })
        else {

            res.status(200).json(doc)

        }
    })

})

//4.Route for getting all the projects
router.get('/projects', function (req, res, next) {
    Project.find((err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find projects' })

        else {

            res.status(200).json(doc)
        }
    })
}
)

// Route for getting all the users
router.get('/users', function (req, res, next) {
    user.find((err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find users' })

        else {

            res.status(200).json(doc)
        }
    })
}
)

//5.Route for getting specific project
router.get('/projects/:id', function (req, res, next) {
    Project.findById(req.params.id, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find project with given ID' })

        else {

            res.status(200).json(doc)
        }
    })
}
)

//6.Route for adding new project
router.post('/projects/addproject', function (req, res, next) {
    var newProject = new Project(req.body)
    newProject.save((err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to add project' })

        else {

            res.status(201).json(doc)
        }
    })
}
)


// router.put('/projects/:id', function (req, res, next) {

//     console.log(req.body)
//     Project.findOneAndUpdate({"project_id":req.params.id},{"applications.application_type":req.body},(err, doc) => {
//         if (err)

//             res.json({ msg: 'unable to update project',"err":err })

//         else {

//             res.json({msg:"successfully updated"})
//         }
//     })
// }
// )

// router.put('/projects/scores/:id', function (req, res, next) {

//      console.log(req.body)
//      Project.findOneAndUpdate({"project_id":req.params.id},{"applications.scores":req.body},(err, doc) => {
//          if (err)

//              res.json({ msg: 'unable to update project',"err":err })

//          else {

//              res.json({msg:"successfully updated"})
//          }
//      })
//  }
//  )


//7.Route for updating the project details
router.put('/projects/:id', function (req, res, next) {
    // var newProject = new Project(req.body)
    Project.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            res.status(500).json({ msg: 'unable to edit project' })

        else {

            res.status(201).json({ msg: 'Successfully Edited' })
        }
    })
}
)


//8.Route for deleting the projects
router.delete('/projects/:id', function (req, res, next) {

    Project.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to delete project' })

        else {
            res.status(200).json({ msg: "successfully deleted" })
        }
    }
    )
})

//Route for adding the attributes
router.put('/projects/attributes/:id', function (req, res, next) {
    // var newProject = new Project(req.body)
    Project.findByIdAndUpdate(req.params.id, { "attribute_details": req.body }, (err, doc) => {
        console.log("body", req.body)
        if (err)
            res.status(500).json({ msg: 'unable to edit project' })

        else {

            res.status(201).json(doc)
        }
    })
}
)

module.exports = router
