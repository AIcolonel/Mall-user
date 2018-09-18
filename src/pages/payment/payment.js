require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.js');
require('./payment.css');

var _payment=require('serice/payment/payment.js');
var _util =require('util/index.js');
var tpl=require('./payment.tpl');

var payment = {
	orderPaymentParams:{
		orderNo:_util.getParamsFromUrl('orderNo') || '',
	},
	init:function(){
		this.onload();
	},
	onload:function(){
		this.getPayment();
	},
	getPayment:function(){
		var _this=this;
		_payment.loadPaymentInfo({orderNo:_this.orderPaymentParams.orderNo},function(payment){
			console.log(payment);
			_this.renderPayment(payment);
			//监听用户什么时候去支付
			_this.listenPaymentStatus();
		},function(err){
			// alert(err);
			$('.payment-content').html('出错啦！！！');
		})
	},
	renderPayment:function(payment){
		var html=_util.render(tpl,{payment:payment});
		$('.payment-content').html(html);
	},
	listenPaymentStatus:function(){
		var _this=this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.orderPaymentParams.orderNo},function(paymentStatus){
				if(paymentStatus == true){
					window.location.href='./result.html?type=payment&orderNo='+_this.orderPaymentParams.orderNo;
				}
			})
		},5000) 
	}
}

$(function(){
	payment.init();
})