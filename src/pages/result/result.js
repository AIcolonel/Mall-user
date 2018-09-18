require('node_modules/font-awesome/css/font-awesome.min.css');
require('pages/common/logo/logo.js');
require('pages/common/footer/footer.js');
require('./result.css');

var _util=require('util/index.js');


$(function(){
	var type=_util.getParamsFromUrl('type') || 'default';

	if(type == 'payment'){
		var orderNo=_util.getParamsFromUrl('orderNo');
		var href=$('.order-detail').attr('href');
		var newHref=href + orderNo;

		$('.order-detail').attr('href',newHref);
	}
	$('.'+type).show();
})