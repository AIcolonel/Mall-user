require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.css');
require('./detail.css');

var detailtpl=require('./detail.tpl');
var _util = require('util/index.js');
var _cart = require('serice/cart/cart.js');
var _product = require('serice/product/product.js');
var _pagination = require('util/pagination/pagination.js');

var product={
	listParams:{
		productId:_util.getParamsFromUrl('category') || ''
	},
	init:function(){
		this.loadDetail();
		this.bindEvent();
	},
	loadDetail:function(){
		_product.getDetailInfo({productId:this.listParams.productId},function(product){
			if(product){
				if(product.image){
					product.images=product.image.split(',')
				}else{
					product.images=[require('images/default/default1.jpg')];
				}
				product.mainImg=product.images[0];
				var html=_util.render(detailtpl,product);
				$('.product-intro').html(html);
			}else{
				alert('您搜索的商品不见啦！！！')
			}
			
		},function(err){
			console.log('err::',err);
		})
	},
	bindEvent:function(){
		var _this=this;

		//切换图片
		$('.product-intro').on('mouseenter','.detail-img-small-item',function(){
			var $this=$(this);
			$this.addClass('active')
			.siblings('.detail-img-small-item').removeClass('active');

			var imgSrc=$this.attr('src');
			$('.detail-img-big img').attr('src',imgSrc);
		})

		//添加或减少商品
		$('.product-intro').on('click','.add-delete-goods',function(){
			var $this=$(this);
			var $input=$('.input-number');
			var $stock=$('.stock').html();
			var min=1;
			if($this.hasClass('fa-plus')){
				if(parseInt($input.val()) >= parseInt($stock)){
					//如果输入框的值大于库存，则无法添加
					return;
				}else{
					// 如果输入框的值小于库存，则可以继续添加
					$input.val(parseInt($input.val())+1);
				}
			}else if($this.hasClass('fa-minus')){
				if(parseInt($input.val()) <=min){
					// 如果输入框的值小于1，则无法继续减少数量
					return;
				}else{
					// 如果输入框的值大于1，则可以继续减少数量
					$input.val(parseInt($input.val())-1);
				}
			}
		})

		//添加购物车
		$('.product-intro').on('click','.add-cart-btn',function(){
			var count=$('.input-number').val();
			_cart.addCartGoods({
				productId:_this.listParams.productId,
				count:count
			},function(result){
				// console.log(result);
				window.location.href='./result.html?type=addCart';
			},function(err){
				alert(err)
			})
		})
	}
}

$(function(){
	product.init();
})
