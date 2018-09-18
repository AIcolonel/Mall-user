var Hogan=require('hogan.js');

var _util={
	request:function(params){
		var _this=this;
		$.ajax({
			method:params.method || 'get',
			url:params.url || '',
			dataType:params.dataType || 'json',
			data:params.data || '',
			success:function(resolve){
				//请求数据成功
				if(resolve.code == 0){
					params.success && params.success(resolve.data)
				}
				// 用户未登录
				else if(resolve.code == 10){
					_this.doLogin();
				}
				// 请求数据失败
				else if(resolve.code == 1){
					params.error && params.error(resolve.message)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg);
	},
	confirm:function(msg){
		return window.confirm(msg);
	},
	doLogin:function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
	},
	goHome:function(){
		window.location.href = '/'
	},
	//渲染页面模板
	render:function(tpl,data){
		var template=Hogan.compile(tpl);
		var html=template.render(data);
		return html;
	},
	getParamsFromUrl:function(key){
		//通过以下方法可以拿到路由地址中？之后的参数
		var query=window.location.search.substr(1);

		var reg=new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result=query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	validate:function(value,type){
		var value = $.trim(value)
		//非空验证
		if(type === 'require'){
			return !!value
		}
		//用户名格式
		if(type === 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//密码格式
		if(type === 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机格式
		if(type === 'phone'){
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
		}
		//邮箱格式
		if(type === 'email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	}
}
 
module.exports=_util;