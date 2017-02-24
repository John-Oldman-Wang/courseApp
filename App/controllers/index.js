var Source=require('../models/sources.js')

module.exports=function(req,res){
	Source.fetch(function(err,sources){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: '栀茗教学',
			sources: sources,
			user:req.session.user
		})
	})
}