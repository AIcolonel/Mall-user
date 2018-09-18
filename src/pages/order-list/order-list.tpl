{{#notEmpty}}
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
	{{#list}}
	<div class="order-main">
		<ul class="order-title">
			<li>
				<span class="order-no">订单号：{{orderNo}}</span>
				<span class="order-status">支付状态：{{statusDesc}}</span>
				<span class="order-time">创建时间：{{createdTime}}</span>
				<span class="order-payment">总金额：{{payment}}</span>
				<span class="order-detail"><a href="/order-detail.html?orderNo={{orderNo}}">订单详情</a></span>
			</li>
		</ul>
		{{#productList}}
			<ul class="cart-item" data-product-id="{{product._id}}">
				<li class="product-info">
					<a href="./detail.html?category={{productId}}" class="link">
						<img src="{{images}}" alt="">
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
	{{/list}}
{{/notEmpty}}

{{^notEmpty}}
<p class="empty-message">还没有订单哦!!!
<a href="/" class="btn gohome-btn">立即去购物</a></p>

{{/notEmpty}}