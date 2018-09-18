{{#list}}
	{{#isActive}}
	<li class="li-item active">
	{{/isActive}}
	{{^isActive}}
	<li class="li-item">
	{{/isActive}}
		<a href="{{href}}" class="link">{{desc}}</a>
	</li>
{{/list}}