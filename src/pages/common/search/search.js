require('./search.css');

var _util = require('util/index.js')

var page = {
	init:function(){
		this.bindEvent();
		//参数回填到输入框事件
		this.onload();
	},
	onload:function(){
		var inputValue=_util.getParamsFromUrl('keyword');
		$('#search-input').val(inputValue);
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;
		$('#btn-search').on('click',function(){
			_self.submit();
		});

		//绑定键盘提交事件
		$('#search-input').on('keyup',function(e){
			if(e.keyCode==13){
				_self.submit();
			}
		})
	},
	submit:function(){
		var keyword=$.trim($('#search-input').val());
		window.location.href='./list.html?keyword='+keyword;
		/*
		if(keyword){
			window.location.href='./list.html?keyword='+keyword;
		}else{
			_util.goHome();
		}
		*/
		
	}
}

$(function(){
	page.init()
})