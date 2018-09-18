require('node_modules/font-awesome/css/font-awesome.min.css');
require('pages/common/logo/logo.js');
require('pages/common/footer/footer.js');
require('./user-register.css');


var _util = require('util/index.js')
var _user = require('serice/user/user.js')
var formErr = {
	show:function(message){
		$('.err').show().find('.err-msg').text(message)
	},
	hide:function(){
		$('.err').hide().find('.err-msg').text('')
	},
}
//登陆页面逻辑
var page = {
	init:function(){
		this.bindEvent();
		$('.err').hide();
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;

		$('[name="username"]').on('blur',function(){
			var username=$('[name="username"]').val();

			//验证用户名不能为空
			if(!_util.validate(username,"require")){
				return;
			}
			//验证用户名格式错误
			if(!_util.validate(username,"username")){
				return;
			}

			_user.checkUserName(username,function(){
				//该用户名可以被注册
				console.log('ok');
			},function(message){
				//该用户名已经存在
				formErr.show(message);
			})
		})

		$('#btn-register').on('click',function(){
			_self.submit();
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="userphone"]').val()),
			email:$.trim($('[name="useremail"]').val()),
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			_user.register(formData,function(){
				window.location.href='./result.html';
			},function(err){
				formErr.show(err);
			})
		}else{
			formErr.show(validateResult.msg)
		}
		//验证失败
	},
	validate:function(formData){
		var result = {
			status:false,
			mag:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.username,"require")){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证用户名格式错误
		if(!_util.validate(formData.username,"username")){
			result.msg = '用户名格式错误';
			return result;
		}
		//验证密码不能为空
		if(!_util.validate(formData.password,"require")){
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码格式错误
		if(!_util.validate(formData.password,"password")){
			result.msg = '密码格式错误';
			return result;
		}
		//验证确认密码
		if(formData.password != formData.repassword){
			result.msg = '密码不一致';
			return result;
		}
		//验证手机不能为空
		if(!_util.validate(formData.phone,"require")){
			result.msg = '手机不能为空';
			return result;
		}
		//验证手机格式
		if(!_util.validate(formData.phone,"phone")){
			result.msg = '手机格式错误';
			return result;
		}
		//验证邮箱不能为空
		if(!_util.validate(formData.email,"require")){
			result.msg = '邮箱不能为空';
			return result;
		}
		//验证手机格式
		if(!_util.validate(formData.email,"email")){
			result.msg = '邮箱格式错误';
			return result;
		}

		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})