require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.js');
require('../common/sider/sider.js');
require('./order-list.css');

var _sider=require('../common/sider/sider.js');
var _order=require('serice/order/order.js');
var _util =require('util/index.js');
var tpl=require('./order-list.tpl');
var _pagination = require('util/pagination/pagination.js');

var orderList = {
	orderListParams:{
		page:_util.getParamsFromUrl('page') || '1',
	},
	init:function(){
		this.onload();
	},
	onload:function(){
		_sider.render('order-list');
		this.getOrderList();
		this.initPagination();
	},
	initPagination:function(){
		var _this=this;
		var $pagination=$('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.orderListParams.page=value;
			_this.getOrderList();
		})
		$pagination.pagination();
	},
	getOrderList:function(){
		_order.loadOrderList(this.orderListParams,function(orders){
			var list=orders.list.map((order)=>{
				order.productList.forEach(product=>{
					if(product.image){
						product.images=product.image.split(',')
					}else{
						product.images=[require('images/default/default1.jpg')];
					}
				})
				
				order.createdTime=new Date(order.createdAt).toLocaleString();
				return order;
			});
			console.log(list)
			var html=_util.render(tpl,{
				list:list,
				notEmpty:!!list.length
			});
			$('.user-center .user-container .content .order-box').html(html);

			//加载分页列表的数据
			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize,
				range:3
			})
		},function(err){
			alert(err);
		})
	}
}

$(function(){
	orderList.init();
})