require('node_modules/font-awesome/css/font-awesome.min.css');
require('../common/search/search.js');
require('../common/nav/nav.css');
require('./index.css');

require('util/carousel/carousel.js');

var keywordtpl=require('./keyword.tpl');
var carouseltpl=require('./carousel.tpl');
var floortpl=require('./floor.tpl');
var _util = require('util/index.js');

var home={
	init:function(){
		this.loadKeyword();
		this.loadCarousel();
		this.loadFloor();
	},
	loadFloor:function(){
		//处理加载楼层
		var floorList=[
			{
				title:'F1 手机',
				item:[
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'红米 6A',img:require('images/floor/floor01-01.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米8',img:require('images/floor/floor01-02.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米 Max2',img:require('images/floor/floor01-03.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米 6X',img:require('images/floor/floor01-04.jpg')}
				]
			},
			{
				title:'F2 家电',
				item:[
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米电视 4A',img:require('images/floor/floor02-01.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米电视 4C',img:require('images/floor/floor02-02.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米电视 4',img:require('images/floor/floor02-03.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米电视 4S',img:require('images/floor/floor02-04.jpg')}
				]
			},
			{
				title:'F3 数码',
				item:[
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米鼠标',img:require('images/floor/floor03-01.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米保温杯',img:require('images/floor/floor03-02.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米音响',img:require('images/floor/floor03-03.jpg')},
					{categoryId:'5b8cedb0cefee1321c4ef404',text:'小米记录仪',img:require('images/floor/floor03-04.jpg')}
				]
			}
		]
		var html=_util.render(floortpl,{floorList:floorList});
		$('.floor-wrap').html(html);
	},
	loadCarousel:function(){
		//处理加载轮播图
		var carouselList=[
			{categoryId:'5b8cedb0cefee1321c4ef404',img:require('images/carousel/carousel-01.jpg')},
			{categoryId:'5b8cedb0cefee1321c4ef404',img:require('images/carousel/carousel-02.jpg')},
			{categoryId:'5b8cedb0cefee1321c4ef404',img:require('images/carousel/carousel-03.jpg')}
		]
		var html=_util.render(carouseltpl,{carouselList:carouselList});
		$('.carousel').html(html);

		// 处理轮播图事件
		$('.carousel').unslider({
		 	dots: true
		});
		var slidey = $('.carousel').unslider(),
    	data = slidey.data('unslider');
    	$('.arrow-prev').on('click',function(){
    		data.prev();
    	});
    	$('.arrow-next').on('click',function(){
    		data.next();
    	});
	},
	loadKeyword:function(){
		var keywordList=[
			{item:[{name:'手机'},{name:'配件'}]},
			{item:[{name:'女装'},{name:'长裙'}]},
			{item:[{name:'童装'},{name:'玩具'}]},
			{item:[{name:'男装'},{name:'休闲鞋'}]},
			{item:[{name:'三家电'},{name:'空调/电视/洗衣机'}]},
			{item:[{name:'电脑'},{name:'品牌'}]},
			{item:[{name:'数码'},{name:'相机'}]},
			{item:[{name:'越野'},{name:'山地车'}]}
		];
		var html=_util.render(keywordtpl,{keywordList:keywordList});
		$('.keyword').html(html);
	}
}

$(function(){
	home.init();
})
