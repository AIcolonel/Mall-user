<div class="pannel-product">
	<p class="address-header">商品清单</p>
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
	{{#cartList}}
	<ul class="cart-item" data-product-id="{{product._id}}">
		<li class="product-info">
			<a href="./detail.html?category={{product._id}}" class="link">
				<img src="http://localhost:3002/resource/default1.jpg" alt="">
				<span>{{product.name}}</span>
			</a>
		</li>
		<li class="product-price">
			￥{{product.price}}
		</li>
		<li class="product-count">
			{{count}}
		</li>
		<li class="product-totalPrice">
			￥{{totalPrice}}
		</li>	
	</ul>
	{{/cartList}}
	<ul class="cart-footer">
		<li class="product-submit">
			<span class="total-price-text">总价:</span>
		 	<span class="total-price" data-total-price="{{totalCartPrice}}">￥{{totalCartPrice}}</span>
		 	<a href="javascript:;" class="btn btn-submit">去支付</a>
		</li>
	</ul>
</div>
