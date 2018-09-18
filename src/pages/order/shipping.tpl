<div class="pannel-address">
	<p class="address-header">送货地址</p>
	{{#shippings}}
	{{#isActive}}
	<div class="address-item clearfix active" data-shipping-id="{{_id}}">
	{{/isActive}}
	{{^isActive}}
	<div class="address-item clearfix" data-shipping-id="{{_id}}">
	{{/isActive}}
		<div class="address-body">
			<div class="address-detail">
				<h3>{{province}} {{city}} ({{username}})</h3>
				<p>{{province}} {{username}} 电话：{{userphone}}</p>
			</div>
		</div>
		<div class="address-footer">
			<div class="operation">
				<span class="address-edit">编辑</span>
				<span class="address-delete">删除</span>
			</div>
		</div>
	</div>
	{{/shippings}}
	<div class="address-item clearfix">
		<div class="address-body">
			<div class="address-detail">
				<h3><i class="fa fa-plus add-address"></i></h3>
				<p>添加地址</p>
			</div>
		</div>
		
	</div>
</div>