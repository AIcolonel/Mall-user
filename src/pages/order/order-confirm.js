require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.css');
require('./order-confirm.css');
var _nav=require('../common/nav/nav.js');

var shippingtpl=require('./shipping.tpl');
var producttpl=require('./product.tpl');
var _util = require('util/index.js');
var _cart = require('serice/cart/cart.js');
var _order = require('serice/order/order.js');
var _shipping = require('serice/shipping/shipping.js');
var _product = require('serice/product/product.js');
var _model=require('./model.js');

var order={
	data:{
		shippingId:null
	},
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShipping();
		this.renderProductList();
	},
	bindEvent:function(){
		var _this=this;
		//去支付
		$('.order-product').on('click','.btn-submit',function(){
			var $this=$(this);
			if(_this.data.shippingId){
				_order.createOrder({shippingId:_this.data.shippingId},function(order){
					// console.log(order);
					window.location.href = "./payment.html?orderNo="+order.orderNo;
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				// window.location.href='./order-confirm.html';
				_util.showErrorMsg('您还没有选择收货地址哦');
				return;
			}
		})

		//阻止事件冒泡
		$('.order-model').on('click','.model',function(e){
			e.stopPropagation();
		});

		//关闭按钮
		$('.order-model').on('click','.model-off',function(){
			_model.hide();
		});

		//添加地址
		$('.order-shipping').on('click','.add-address',function(){
			_model.show({
				success:function(shippings){
					_this.renderShipping(shippings)
				}
			});
		});

		//删除地址
		$('.order-shipping').on('click','.address-delete',function(e){
			e.stopPropagation();
			var $this=$(this);
			var shippingId=$this.parents('.address-item').data('shipping-id');
			if(_util.confirm('你确定要删除该条地址吗？')){
				_shipping.deleteAddress({shippingId:shippingId},function(shippings){
					_this.renderShipping(shippings)
				},function(err){
					alert(err);
				})
			}
		});

		//编辑地址
		$('.order-shipping').on('click','.address-edit',function(e){
			e.stopPropagation();
			var $this=$(this);
			var shippingId=$this.parents('.address-item').data('shipping-id');
			_shipping.getAddress({shippingId:shippingId},function(shippings){
				// console.log(shippings);
				_model.show({
					data:shippings,
					success:function(shippings){
						_this.renderShipping(shippings)
					}
				});
			},function(err){
				alert(err)
			})
		});
		
		//选中地址
		$('.order-shipping').on('click','.address-item',function(){
			$(this).addClass('active')
			.siblings('.address-item').removeClass('active');
			_this.data.shippingId=$(this).data('shipping-id');
		})
	},
	loadShipping:function(){
		var _this=this;
		_shipping.getShippingList(function(shippings){
			_this.renderShipping(shippings);
		},function(err){
			alert(err);
		})
	},
	renderShipping:function(shippings){
		var _this=this;
		shippings.forEach(function(shipping){
			if(shipping._id == _this.data.shippingId){
				shipping.isActive=true;
			}
		})

		var html = _util.render(shippingtpl,{shippings:shippings});
		$('.order-shipping').html(html);
		
	},
	renderProductList:function(){
		_nav.loadCart();
		var _this=this;
		_order.getOrderProductList(function(orderList){
			// console.log(orderList);
			var html = _util.render(producttpl,orderList);
			$('.order-product').html(html);
		},function(err){
			$('.order-product').html('<p class="cart-empty">商品不见啦，刷新试试看！！</p>');
		})
		
	}
}

$(function(){
	order.init();
})
