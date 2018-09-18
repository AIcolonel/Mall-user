var _util =require('util/index.js');

var _order={
	getOrderProductList:function(success,error){
		_util.request({
			url:'/order',
			success:success,
			error:error
		})
	},
	createOrder:function(data,success,error){
		_util.request({
			url:'order',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	},
	loadOrderList:function(data,success,error){
		_util.request({
			url:'/order/list',
			data:data,
			success:success,
			error:error
		})
	},
	loadOrderDetail:function(data,success,error){
		_util.request({
			url:'/order/detail',
			data:data,
			success:success,
			error:error
		})
	},
	cancelOrder:function(data,success,error){
		_util.request({
			url:'/order/cancel',
			method:'put',
			data:data,
			success:success,
			error:error
		})
	}
}

module.exports=_order;