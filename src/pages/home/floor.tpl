{{#floorList}}
<div class="floor-box clearfix">
	<h2 class="floor-text">{{title}}</h2>
	<ul class="floor-ul">
		{{#item}}
		<li class="floor-item">
			<a href="./list.html?categoryId={{categoryId}}" class="floor-link" >
				<p>{{text}}</p>
				<img class="floor-img" src="{{img}}">
			</a>
		</li>
		{{/item}}
	</ul>
</div>
{{/floorList}}