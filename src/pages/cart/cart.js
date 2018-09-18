require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.css');
require('./cart.css');
var _nav=require('../common/nav/nav.js');

var carttpl=require('./cart.tpl');
var _util = require('util/index.js');
var _cart = require('serice/cart/cart.js');
var _product = require('serice/product/product.js');

var cart={
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this=this;
		//选中或取消选中
		$('.cart-box').on('click','.select-one',function(){
			var $this=$(this);
			var productId=$this.parents('.cart-item').data('product-id');
			//选中一个
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}else{//取消一个
				_cart.offSelectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}
		})	

		// 全部选中或全部取消
		$('.cart-box').on('click','.select-all',function(){
			var $this=$(this);
			//选中全部
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}else{//取消全部
				_cart.offSelectAll(function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}
		})

		//删除一条购物车商品
		$('.cart-box').on('click','.delete-one',function(){
			var $this=$(this);
			var productId=$this.parents('.cart-item').data('product-id');

			if(_util.confirm('你确定要删除该条商品吗？')){
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}
		})

		//删除选中的商品
		$('.cart-box').on('click','.delete-selected',function(){
			var $this=$(this);

			if(_util.confirm('你确定要删除选中的商品吗？')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart);
				},function(err){
					_this.showPageError();
				})
			}
		})

		//增加或减少商品数量
		$('.cart-box').on('click','.count-btn',function(){
			var $this=$(this);
			var productId=$this.parents('.cart-item').data('product-id');
			var $input=$this.siblings('.count-input');
			var current =parseInt($input.val());
			var max=$input.data('stock');
			var min=1;
			var newCount=0;
			// 增加
			if($this.hasClass('plus')){
				if(current>=max){
					newCount=max;
					_util.showErrorMsg('商品达到上限啦！！！')
					return;
				}
				newCount=current+1;
			}else if($this.hasClass('minus')){//减少
				if(current<=min){
					newCount=min;
					_util.showErrorMsg('商品数量最少是一个哦！！！')
					return;
				}
				newCount=current-1;
			}
			
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart);
			},function(err){
				console.log(err);
				_this.showPageError();
			})
		})

		//去结算
		$('.cart-box').on('click','.btn-submit',function(){
			var $this=$(this);
			var totalCartPrice=$this.siblings('.total-price').data('total-price');
			if(totalCartPrice<=0){
				_util.showErrorMsg('您还没有选中任何需要结算的商品哦');
				return;
			}else{
				window.location.href='./order-confirm.html';
			}
		})
	},
	loadCart:function(){
		var _this=this;
		_cart.getCart(function(cart){
			// console.log(cart);
			_this.renderCart(cart);
		},function(err){
			alert(err);
			_this.showPageError();
		})
		
	},
	renderCart:function(cart){
		_nav.loadCart();
		cart.cartList.forEach(item=>{
			if(item.product.image){
				item.product.images=item.product.image.split(',')[0]
			}else{
				item.product.images=require('images/default/default1.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		var html=_util.render(carttpl,cart)
		$('.cart-box').html(html);
	},
	showPageError:function(){
		$('.cart-box').html('<p class="cart-empty">商品不见啦，刷新试试看！！</p>');
	}
}

$(function(){
	cart.init();
})
