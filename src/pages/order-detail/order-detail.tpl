{{#notEmpty}}
	
	{{#order}}
	<div class="pannel-title">
		<h2>订单详情</h2>
		<ul>
			<li>
				<span class="order-no">订单号：{{orderNo}}</span>
			</li>
			<li>
				<span class="order-status">支付状态：{{statusDesc}}</span>
			</li>
			<li>
				<span class="order-status">收件人：{{shipping.username}}(电话：{{shipping.userphone}})</span>
			</li>
			<li>
				<span class="order-status">详细地址：{{shipping.province}} {{shipping.city}} {{shipping.address}}</span>
			</li>
			<li>
				<span class="order-time">创建时间：{{createdTime}}</span>
			</li>
			<li>
				<span class="order-payment">总金额：{{payment}}</span>
			</li>
			{{#needPay}}
			<li>
				<span class="off-order">取消订单</span>
				<span class="pay-order"><a href="/payment.html?orderNo={{orderNo}}">去支付</a></span>
			</li>
			{{/needPay}}
		</ul>
	</div>
	<ul class="cart-title clearfix">
		<li class="product-info">
			商品
		</li>
		<li class="product-price">
			单价
		</li>
		<li class="product-count">
			数量
		</li>
		<li class="product-totalPrice">
			小计
		</li>
	</ul>
	<div class="order-main">
		{{#productList}}
			<ul class="cart-item" data-product-id="{{product._id}}">
				<li class="product-info">
					<a href="./detail.html?category={{productId}}" class="link">
						<img src="http://localhost:3002/resource/default1.jpg" alt="">
						<span>{{name}}</span>
					</a>
				</li>
				<li class="product-price">
					￥{{price}}
				</li>
				<li class="product-count">
					{{count}}
				</li>
				<li class="product-totalPrice">
					￥{{totalPrice}}
				</li>
			</ul>
		{{/productList}}
	</div>
	{{/order}}
{{/notEmpty}}

{{^notEmpty}}
<p class="empty-message">订单不见啦!!!
<a href="/" class="btn gohome-btn">立即去购物</a></p>

{{/notEmpty}}