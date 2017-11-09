//importing
var express = require('express')
var mongoose = require('mongoose')
var bodyParser=require('body-parser')
var userroutes=require('./routes/user')
var transformRoutes = require('./routes/transformRoutes');

//Instantiation
var app=express()

app.use(function(req,res,next){
    res.header("Access-control-Allow-Origin","*");
    res.header("Access-control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept")
    res.header("Access-control-Allow-Methods","PUT,POST,GET,DELETE")
    next()

})

app.set('port', 3500)
app.set('mongoDbURL','mongodb://localhost:27017/transformdb')

var cookieParser=require('cookie-parser')
var session=require('express-session')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser())
app.use(session({
    secret:"anything",
    //forces the session to be saved in the store
    //its default value is true
    saveUninitilaized:false,
    //forces the session to be saved back to store even if not saved
    resave:false
}))

app.use('/transform',userroutes )
app.use('/api/apps', transformRoutes);
//connecting to mongodb
mongoose.connect(app.get('mongoDbURL'), { useMongoClient: true })
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB :)"+app.get('mongoDbURL'))
})
mongoose.connection.on("error", (err) => {
    if (err)
        console.log("Connection failed :( " + err)
})
app.listen(app.get('port'), function () {
    console.log("Todo app running on port: " + app.get('port'))
})