require('./sider.css');

var _util=require('util/index.js');
var tpl=require('./sider.tpl');

var sider={
	list:[
		{name:'user-center',desc:'用户中心',href:'/user-center.html'},
		{name:'order-list',desc:'订单管理',href:'/order-list.html'},
		{name:'user-update-password',desc:'修改密码',href:'/user-update-password.html'}
	],
	render:function(name){
		for(var i=0;i<this.list.length;i++){
			if(this.list[i].name == name){
				this.list[i].isActive=true;
			}
		}
		var html=_util.render(tpl,{list:this.list});
		// console.log(html) 
		$('.user-ul').html(html);
	}
}

module.exports=sider;