var upload=require("multer")()
var index=require("../App/controllers/index")
var Source=require("../App/controllers/source")
var User=require("../App/controllers/user")
//var Visitor=require("../App/models/visitors.js")
module.exports=function(app){
	//Home page
	app.get("/",index)
	//see movie
	app.get("/watch",Source.watch)

	//sign up
	app.post("/user/new",User.new)
    //whetheruser
    app.get("/user/whether",User.whetheruser)
	//sign in
	app.post("/user/verification",User.verification)

	//logout
	app.get("/logout",User.logout)

	//movies list
	app.get("/admin/userlist",User.list)
	app.get("/admin/source/new",Source.editnew)
	app.get("/admin/source/update/:id",Source.editold)
	app.post("/admin/source/new",Source.NewUpdate)
	app.get("/admin/sourcelist",Source.list)
	app.delete("/admin/source/del",Source.del)


	/*app.get("/admin/visitorlist",function(req,res){
		Visitor.fetch(function(err,visitors){
			res.render("visitorlist",{
				title:"访客列表",
				visitors:visitors,
				user:req.session.user
			})
		})
	})
	app.delete("/admin/visitor/del",function(req,res){
		var id=req.query.id
		if(id){
			Visitor.remove({_id:id},function(err,movie){
				if(err){
					console.log(err)
				}
				else{
					res.json({success:1})
				}
			})
		}
	})*/
}