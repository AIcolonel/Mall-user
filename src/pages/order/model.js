var _util = require('util/index.js');
var modeltpl=require('./model.tpl');
var _city=require('util/city/city.js');
var _shipping=require('serice/shipping/shipping.js');

var formErr = {
	show:function(message){
		$('.err').show().find('.err-msg').text(message)
	},
	hide:function(){
		$('.err').hide().find('.err-msg').text('')
	},
}

var _model={
	show:function(options){
		this.options=options;
		this.$box=$('.order-model');
		this.loadModel();
		this.bindEvent();
	},
	loadModel:function(){
		var _this=this;
		var html=_util.render(modeltpl);
		this.$box.html(html);

		//参数回填
		if(_this.options.data){
			this.$box.find('[name="username"]').val(_this.options.data.username);
			this.$box.find('[name="address"]').val(_this.options.data.address);
			this.$box.find('[name="userphone"]').val(_this.options.data.userphone);
			this.$box.find('[name="zip"]').val(_this.options.data.zip);

			this.$box.find('.header-text').text('编辑地址');
		}

		this.loadProvince();
	},
	hide:function(){
		this.$box.empty();
	},
	bindEvent:function(){
		// 城市联动
		var _this=this;
		var $province=_this.$box.find('.province-select')
		$province.on('change',function(){
			_this.loadCity($province.val())
		});

		//提交添加地址
		var $submit=_this.$box.find('.btn-submit');
		$submit.on('click',function(){
			_this.submit();
		})
	},
	loadProvince:function(){
		var _this=this;
		var provinces = _city.getProvince();
		// console.log(provinces);
		var provincesSelectOptions = this.getSelectOptions(provinces);
		this.$box.find('.province-select').html(provincesSelectOptions);

		//省份回填
		if(this.options.data && this.options.data.province){
			this.$box.find('.province-select').val(this.options.data.province);
			_this.loadCity(this.options.data.province);
		}
	},
	loadCity:function(provinceName){
		var _this=this;
		var cities=_city.getCities(provinceName);
		// console.log(cities);
		var citySelectOptions = this.getSelectOptions(cities);
		this.$box.find('.city-select').html(citySelectOptions);

		//城市回填
		if(this.options.data && this.options.data.city){
			this.$box.find('.city-select').val(this.options.data.city);
		}
	},
	getSelectOptions:function(arr){
		let html = '<option value="">请选择</option>';
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		return html;
	},
	submit:function(){
		var _this=this;
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			userphone:$.trim($('[name="userphone"]').val()),
			zip:$.trim($('[name="zip"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			if(_this.options.data){
				formData.shippingId=_this.options.data._id;
				_shipping.editAddress(formData,function(shippings){
					alert('编辑地址成功');
					// console.log(shippings);
					_this.hide();
					_this.options.success(shippings);
				},function(err){
					formErr.show(err);
				})
			}else{
				_shipping.shipping(formData,function(shippings){
					alert('新增地址成功');
					console.log(shippings);
					_this.hide();
					_this.options.success(shippings);
				},function(err){
					formErr.show(err);
				})
			}
			
		}else{
			formErr.show(validateResult.msg)
		}
		//验证失败
	},
	validate:function(formData){
		var result = {
			status:false,
			mag:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.username,"require")){
			result.msg = '收件人不能为空';
			return result;
		}
		//验证省份不能为空
		if(!_util.validate(formData.province,"require")){
			result.msg = '省份不能为空';
			return result;
		}
		//验证城市不能为空
		if(!_util.validate(formData.city,"require")){
			result.msg = '城市不能为空';
			return result;
		}
		//验证地址不能为空
		if(!_util.validate(formData.address,"require")){
			result.msg = '地址不能为空';
			return result;
		}
		//验证手机不能为空
		if(!_util.validate(formData.userphone,"require")){
			result.msg = '手机不能为空';
			return result;
		}
		//验证手机格式
		if(!_util.validate(formData.userphone,"phone")){
			result.msg = '手机格式错误';
			return result;
		}

		result.status = true;
		return result;
	}
}

module.exports=_model;