var express=require("express")
var mongoose=require("mongoose")
var path=require("path")
var fs=require("fs")
mongoose.Promise=Promise
var dburl="mongodb://localhost/course"
var session=require("express-session")
var mongoStore=require("connect-mongo")(session)


var app=express()
var port=process.env.PORT || 3000

mongoose.connect(dburl)
app.set("env","production")
app.disable("x-powered-by")
app.set("views","./App/views/pages")
app.set("view engine","jade")
app.use(express.static("public"))
app.use(session({
	secret:"movies",
	store: new mongoStore({
		url:dburl,
		collection: "sessions"
	})
}))
require("./config/Middleware")(app)




var moment=require("moment")
app.locals.moment=moment

require("./config/routes")(app)
app.use("*",function(req,res){
	res.end("404 Not Found")
})
app.listen(port)
console.log("start at "+port)