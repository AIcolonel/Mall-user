require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.js');
require('../common/sider/sider.js');
require('./user-update-password.css');

var _user=require('../../serice/user/user.js');
var _util = require('util/index.js')
var _sider= require('../common/sider/sider.js');

var formErr = {
	show:function(message){
		$('.err').show().find('.err-msg').text(message)
	},
	hide:function(){
		$('.err').hide().find('.err-msg').text('')
	},
}

var page = {
	init:function(){
		$('.err').hide();
		this.bindEvent();
		this.onload();
	},
	onload:function(){
		_sider.render('user-update-password');
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;

		$('#btn-update-password').on('click',function(){
			_self.submit();
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			newPassword:$.trim($('[name="newPassword"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			_user.updatePassword(formData,function(){
				window.location.href='./result.html?type=updatePassword';
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
		if(formData.password != formData.newPassword){
			result.msg = '新密码不一致';
			return result;
		}
		//验证新密码格式错误
		if(!_util.validate(formData.newPassword,"password")){
			result.msg = '新密码格式错误';
			return result;
		}
	
		result.status = true;
		return result;
	}
}

$(function(){
	page.init();
})