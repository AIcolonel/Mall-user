require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.js');
require('../common/sider/sider.js');
require('./user-center.css');

var _user=require('../../serice/user/user.js');
var _util = require('util/index.js')
var _sider= require('../common/sider/sider.js');
var tpl=require('./user-center.tpl');

var page = {
	init:function(){
		this.bindEvent();
		this.onload();
	},
	onload:function(){
		_sider.render('user-center');
		_user.loadUserInfo(function(userInfo){
			// console.log(userInfo);
			var html=_util.render(tpl,userInfo);
			$('.content').html(html);
		})
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;
		
	}
}

$(function(){
	page.init();
})