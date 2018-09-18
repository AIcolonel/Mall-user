require('./pagination.css');

var tpl =require('./pagination.tpl');
var _util = require('util/index.js');

(function($){
	function Pagination($elem){
		this.$elem=$elem;
		this.bindEvent();
	}
	Pagination.prototype={
		constructor:Pagination,
		bindEvent:function(){
			var _self=this;
			this.$elem.on('click','.page-item',function(){
				// console.log($(this).data('value'));
				if($(this).hasClass('active-item' || 'disabled')){
					return;
				}
				_self.$elem.trigger('page-change',[$(this).data('value')]);
			})
		},
		render:function(options){
			//计算总页数
			var pages=Math.ceil(options.total/options.pageSize);
			if(pages<=1){
				return;
			}

			//页面数据
			var start=options.current-options.range>1 ? options.current-options.range : 1 ;
			var end=options.current+options.range <pages ? options.current+options.range : pages;
			var prev=options.current-1;
			var next=options.current+1;
			var hasPrev=prev >0 ? true : false;
			var hasNext=next <=pages ? true : false;

			var pageArray=[];
			pageArray.push({
				name:'上一页',
				value:prev,
				disabled:!hasPrev
			})
			for(var i=start;i<=end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:i==options.current
				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:!hasNext
			})

			var html=_util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			});
			this.$elem.html(html);
		}
	}

	Pagination.DEFAULT={
		current:1,
		total:1,
		pageSize:10,
		range:3
	}

	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $this = $(this);
				var pagination = $this.data('pagination');
				if(!pagination){//单例模式
					pagination = new Pagination($(this));
					$this.data('pagination',pagination);
				}
				if(typeof pagination[fn] == 'function'){
					options=$.extend({},Pagination.DEFAULT,options);
					pagination[fn](options);
				}
			});
		}
	})
})(window.jQuery)