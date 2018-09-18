require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.js');
require('../common/sider/sider.js');
require('./order-detail.css');

var _sider=require('../common/sider/sider.js');
var _order=require('serice/order/order.js');
var _util =require('util/index.js');
var tpl=require('./order-detail.tpl');

var orderDetail = {
	orderDetailParams:{
		orderNo:_util.getParamsFromUrl('orderNo') || '',
	},
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		_sider.render('order-list');
		this.getOrderDetail();
	},
	bindEvent:function(){
		var _this=this;
		$('.order-detail-box').on('click','.off-order',function(){
			_order.cancelOrder({orderNo:_this.orderDetailParams.orderNo},function(order){
				_this.renderOrderDetail(order);
			},function(err){
				alert(err)
			})
		})
	},
	getOrderDetail:function(){
		var _this=this;
		_order.loadOrderDetail({orderNo:this.orderDetailParams.orderNo},function(order){
			console.log(order)
			_this.renderOrderDetail(order);
		},function(err){
			alert(err);
		})
	},
	renderOrderDetail:function(order){
		order.createdTime=new Date(order.createdAt).toLocaleString();
		var html=_util.render(tpl,{
			order:order,
			notEmpty:!!order,
			needPay:order.statusDesc=="未支付" ? true : false
		});
		$('.user-center .user-container .content .order-detail-box').html(html);
	}
}

$(function(){
	orderDetail.init();
})