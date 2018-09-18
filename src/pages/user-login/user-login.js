require('node_modules/font-awesome/css/font-awesome.min.css');
require('pages/common/logo/logo.js');
require('pages/common/footer/footer.js');
require('./user-login.css');

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
		$('#btn-submit').on('click',function(){
			_self.submit();
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			_user.login(formData,function(result){
				// _util.goHome()
				var url=_util.getParamsFromUrl('redirect') || '/';
				window.location.href=url;
			},function(err){
				formErr.show(err)
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

		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})