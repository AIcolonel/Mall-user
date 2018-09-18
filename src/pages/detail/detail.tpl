<div class="detail-img">
		<div class="detail-img-big clearfix">
			<img src="{{mainImg}}" alt="">
		</div>
		<div class="detail-img-small">
			{{#images}}
			<img class="detail-img-small-item" src="{{.}}" alt="">
			{{/images}}
		</div>
	</div>
	<div class="detail-info">
		<div class="product-name">
			<span>商品名称：</span>
			<span>{{name}}</span>
		</div>
		<div class="product-price">
			<span>商品价格：</span>
			<span>￥{{price}}</span>
		</div>
		<div class="product-inventory">
			<span>商品库存：</span>
			<span class="stock">{{number}}</span>
		</div>
		<div class="product-number">
			<span>购买数量：</span>
			<input type="number" name="number" value="1" class="input-number" readonly>
			<span><i class="fa fa-plus add-delete-goods"></i></span>
			<span><i class="fa fa-minus add-delete-goods"></i></span>
		</div>
		<div class="addCart">
			<div class="btn add-cart-btn">
				添加购物车
			</div>
		</div>
	</div>
</div>
<div class="product-detail">
	<div class="container clearfix">
		<div class="product-info">
			<div class="product-detail-info">商品详情</div>
			<div class="product-detail-content">
				{{{value}}}
			</div>
		</div>
		<div class="product-commen">
			<div class="product-commen-info">评论列表</div>
			<div class="product-commen-content">
				commen
			</div>
		</div>
	</div>
</div>