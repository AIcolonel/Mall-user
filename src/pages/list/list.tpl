<ul class="list-ul">
	{{#list}}
	<li class="list-item">
		<a href="./detail.html?category={{_id}}">
			<img class="img-item" src="{{images}}">
			<a class="price-item-order" href="javascript:;">￥:{{price}}</a>
			<a class="name-item" href="javascript:;">{{name}}</a>
		</a>
	</li>
	{{/list}}
	{{^list}}
	<p class="nothing">你要搜索的商品去火星啦！！！</p>
	{{/list}}
</ul>