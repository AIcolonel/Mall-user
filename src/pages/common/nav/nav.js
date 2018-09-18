require('./nav.css');
var _user=require('../../../serice/user/user.js');
var _util=require('util/index.js');
var _cart = require('serice/cart/cart.js');
var nav={
	init:function(){
		this.userLogout();
		this.loadCart();
		this.loadOrder();
		this.loadUser();
		return this;
	},
	userLogout:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(err){
				console.log(err);
				_util.showErrorMsg(err);
			});
		})
	},
	loadUser:function(){
		_user.loadUserName(function(result){
			// console.log(result);
			$('.not-login').hide();
			$('.login').show().find('.userInfo').html(result.username);
		})
	},
	loadCart:function(){
		_cart.getCartInfo(function(cartNum){
			$('.nav-list .cart-num').text(cartNum || 0);
		},function(err){
			$('.nav-list .cart-num').text(cartNum || 0);
			alert(err);
		})
	},
	loadOrder:function(){

	}
}


module.exports=nav.init();