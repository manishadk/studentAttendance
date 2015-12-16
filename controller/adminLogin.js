var adminLoginModel = require('../model/adminmodel');
module.exports={

	auth: (req,res,next) =>{
		adminLoginModel(function(error,data){

			var admindata = data.findOne({
				where:{
					username:req.body.username,
					password:req.body.password
				}
			}).then(function(authdata){
				// console.log(authdata);
				if (!authdata){
				// console.log('auth is null');
				req.authenticated=false;
				}
				else{
					// console.log('auth is true');
					req.authenticated=true;
				}
				// else{
				
				// success_msg='Welcome '+req.body.username;
				// res.render('dashboard', {message:msg});
				// }
					return next();
     			});
		// console.log('in controller');
 
		});

	},

	view: (req,res,next)=>{

		if(!req.authenticated){
			var js = {
				success : 0,
				message : 'username and password not matched'
			}

			return res.json(js);

		 // return res.render('index',{messagee:'auth error'});
		}
		var js = {
			success : 1,
			message : 'welcome'
		}
		return res.json(js);
	}

}