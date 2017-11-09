var mongoose = require('mongoose')
var schema=mongoose.Schema;

var userSchema= new schema({
        project_name:{type:String,required:true},
        user_email:{type:String,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true},
        authkey:{type:String,required:true}
    })

module.exports=mongoose.model('user',userSchema)