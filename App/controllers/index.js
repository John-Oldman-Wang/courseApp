var Source=require('../models/sources.js')

module.exports=function(req,res){
	Source.fetch(function(err,sources){
		if(err){
			console.log(err)
		}
		res.redirect("/index.html")
	})
}