var router = require('express').Router();

router.get('/',function(req,res,next){
    res.render('template',{title:"Home"});
})

module.exports.router=router;