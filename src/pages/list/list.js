require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.css');
require('./list.css');

var listtpl=require('./list.tpl');
var _util = require('util/index.js');
var _product = require('serice/product/product.js');
var _pagination = require('util/pagination/pagination.js');

var home={
	listParams:{
		keyword:_util.getParamsFromUrl('keyword') || '',
		categoryId:_util.getParamsFromUrl('categoryId') || '',
		page:_util.getParamsFromUrl('page') || '1',
		orderBy:_util.getParamsFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.bindEvent();
		this.loadProductionList();
		this.initPagination();
	},
	initPagination:function(){
		var _this=this;
		var $pagination=$('.pagination-list');
		$pagination.on('page-change',function(e,value){
			_this.listParams.page=value;
			_this.loadProductionList();
		})
		$pagination.pagination();
	},
	bindEvent:function(){
		var _self=this;
		$('.order-item').on('click',function(){
			var $this=$(this);
			//点击的是默认排序
			if($this.hasClass('default-order')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active').siblings('.order-item').removeClass('active');
				_self.listParams.orderBy='default';
			}
			// 点击的是按价格排序
			else if($this.hasClass('price-order')){
				$this.addClass('active').siblings('.order-item').removeClass('active');
				if(!$this.hasClass('price-ascending')){
					$this.addClass('price-ascending')
					.removeClass('price-down');
					_self.listParams.orderBy = 'price-ascending';
				}else{
					$this.addClass('price-down')
					.removeClass('price-ascending');
					_self.listParams.orderBy = 'price-down';					
				}	
			}
			_self.listParams.page=1;
			_self.loadProductionList();
		})
	},
	loadProductionList:function(){
		this.listParams.categoryId
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		// console.log(this.listParams);

		//当页面数据没有加载出来时，出现加载图片
		$('.list-table').html('<div class="loading"></div>')

		_product.getProductList(this.listParams,function(result){
			var list=result.list.map(function(product){
				if(product.image){
					product.images=product.image.split(',')[0]
				}else{
					product.images=require('images/default/default1.jpg');
				} 
				return product;
			});
			console.log(list);
			list.defaultImg=require('images/default/default1.jpg');
			var html=_util.render(listtpl,{list:list});
			$('.list-table').html(html);

			//加载分页列表的数据
			$('.pagination-list').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				range:3
			})
		},function(err){
			console.log(err)
		})
	}
}

$(function(){
	home.init();
})
