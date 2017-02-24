var Source=require('../models/sources.js')
var _=require('underscore')
exports.watch=function(req,res){
	var id=req.query.id
	Source.findById(id,function(err,source){
		if(err){
			console.log(err)
		}
		var title= source? source.title:"不存在你要观看的电影"
		res.render('watchsource',{
			title: title,
			source: source,
			user:req.session.user
		})
	})	
}

//edit new source
exports.editnew=function(req,res){
	res.render('editsource',{
		title: '新增加课程',
		source:{
			title:'',
			grade:'',
			teacher:'',
			picture:'',
			filepath:'',
			summary:''
		},
		user:req.session.user
	})
}

//edit old movie
exports.editold=function(req,res){
	var id=req.params.id
	Source.findById(id,function(err,source){
		res.render('editsource',{
			title:"修改课程信息-"+source.title,
			source:source,
			user:req.session.user
		})
	})
}

//new movie or update old movie
exports.NewUpdate=function(req,res){
	//console.log(req.body)
	console.log(req.body.source)
	var id=req.body.source._id
	var sourceObj=req.body.source
	var _source
	if(id!== undefined && id !== "undefined" && id !== ''){
		Source.findById(id,function(err,movie){
			if(err){
				console.log(err)
				res.end("数据库出错")
			}
			if(source == null){
				_source=new Source({
					title: sourceOBJ.title,
					teacher: sourceOBJ.teacher,
					grade: sourceOBJ.grade,
					picture: sourceOBJ.language,
					filepath: sourceOBJ.filepath,
					summary: sourceOBJ.summary
				})
				_source.save(function(err,source){
					if(err){
						console.log(err)
					}
					res.redirect('/watch?id='+source._id)
				})
			}else{
				_source=_.extend(source,sourceObj)
				_source.save(function(err,source){
					if(err){
						console.log(err)
					}
					res.redirect('/watch?id='+source._id)
				})
			}	
		})
	}
	else{
		_source=new Source({
			title: sourceObj.title,
			teacher: sourceObj.teacher,
			grade: sourceObj.grade,
			picture: sourceObj.picture,
			filepath: sourceObj.filepath,
			summary: sourceObj.summary
		})
		_source.save(function(err,source){
			if(err){
				console.log(err)
			}
			res.redirect('/watch?id='+source._id)
		})
	}
}

//sources liste
exports.list=function(req,res){
	Source.fetch(function(err,sources){
		if(err){
			console.log(err)
		}
		res.render('movielist',{
			title: '电影列表',
			sources: sources,
			user:req.session.user
		})
	})
}

//delete movie
exports.del=function(req,res){
	var id=req.query.id
	if(id){
		Source.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}