var _util =require('util/index.js');

var _payment={
	loadPaymentInfo:function(data,success,error){
		_util.request({
			url:'/payment',
			data:data,
			success:success,
			error:error
		})
	},
	getPaymentStatus:function(data,success,error){
		_util.request({
			url:'/payment/getStatus',
			data:data,
			success:success,
			error:error
		})
	}
}

module.exports=_payment;