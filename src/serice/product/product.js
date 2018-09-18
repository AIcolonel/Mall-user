var _util =require('util/index.js');

var _product={
	getProductList:function(data,success,error){
		_util.request({
			method:'get',
			url:'/user/getGoodsList',
			data:data,
			success:success,
			error:error
		})
	},
	getDetailInfo:function(data,success,error){
		_util.request({
			method:'get',
			url:'/user/getDetailInfo',
			data:data,
			success:success,
			error:error
		})
	}
}

module.exports=_product;