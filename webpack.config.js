const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const publicPath='/';//定义一个根路径，使出口文件中所有引用文件的路径都是以根路径开始
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//获取和生成页面模板
const getHTMLConfig=(name,title)=>({
	title: title,
	inject:true,
	hash:true,
	template:'./src/view/'+name+'.html',
	filename: name+'.html',
	chunks:['common',name]
})

module.exports = {
	// 配置入口文件，打包目标文件
	entry: {
		'common':'./src/pages/common/common.js',
		'index':'./src/pages/home/index.js',
		'list':'./src/pages/list/list.js',
		'detail':'./src/pages/detail/detail.js',
		'cart':'./src/pages/cart/cart.js',
		'payment':'./src/pages/payment/payment.js',
		'order-confirm':'./src/pages/order/order-confirm.js',
		'order-list':'./src/pages/order-list/order-list.js',
		'order-detail':'./src/pages/order-detail/order-detail.js',
		'user-login':'./src/pages/user-login/user-login.js',
		'user-register':'./src/pages/user-register/user-register.js',
		'result':'./src/pages/result/result.js',
		'user-center':'./src/pages/user-center/user-center.js',
		'user-update-password':'./src/pages/user-update-password/user-update-password.js'
	},
	// 指定文件是用来开发（production），还是用来上线的（development）
	mode:'development',
	// 出口文件，打包完成后会生成一个最终文件（bundle.js），名字自己指定
	output: {
		filename: 'js/[name].js',
		publicPath:publicPath,
		path: path.resolve(__dirname, 'dist')
	},
	//额外配置jQuery模块
	externals:{
		'jquery':'Window.jQuery'
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            images:path.resolve(__dirname,'./src/images'),
            util:path.resolve(__dirname,'./src/util'),
            serice:path.resolve(__dirname,'./src/serice'),
            node_modules:path.resolve(__dirname,'./node_modules')
        }
    },
	module: {
		rules: [
			{
			//配置加载css文件
			test: /\.css$/,
				use: [
				  {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              publicPath: publicPath
		            }
		          },
				  "css-loader"
				]
			},
			//配置加载图片
			{
				test:/\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
				use: [
				  	{
						loader:'url-loader',
		          		options:{
		          			limit:100,//图片大小限制，小于该值时打包为barse64格式
		          			name:'resource/[name].[ext]'//文件打包后的目录
		          		}
				  	}
			 	]
			},
			// 处理react
			{
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','stage-3'],
                        //按需加载
                        plugins: [
						    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
						]
                    }
                    
                }               
            },
            //处理tpl文件
            {
                test:/\.tpl$/,
                use: {
                    loader: 'html-loader'
                }               
            }
		]
	},
	plugins: [
		new HtmlWebpackPlugin(getHTMLConfig('index','首页')),
		new HtmlWebpackPlugin(getHTMLConfig('list','商品列表')),
		new HtmlWebpackPlugin(getHTMLConfig('detail','商品详情')),
		new HtmlWebpackPlugin(getHTMLConfig('cart','购物车')),
		new HtmlWebpackPlugin(getHTMLConfig('payment','订单支付')),
		new HtmlWebpackPlugin(getHTMLConfig('order-confirm','订单确认')),
		new HtmlWebpackPlugin(getHTMLConfig('order-list','订单列表')),
		new HtmlWebpackPlugin(getHTMLConfig('order-detail','订单详情')),
		new HtmlWebpackPlugin(getHTMLConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHTMLConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHTMLConfig('result','返回结果')),
		new HtmlWebpackPlugin(getHTMLConfig('user-center','用户中心')),
		new HtmlWebpackPlugin(getHTMLConfig('user-update-password','修改密码')),
		// 清除多余文件
		new CleanWebpackPlugin(['dist']),
		//打包生成css文件
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "[id].css"
	    })
	],
	devServer:{ 
		contentBase: './dist',
		port:3002,
		historyApiFallback:true,
		proxy: {
	      	"/user": {
	        	target:'http://127.0.0.1:3000',
	        	changeOrigin:true
	        },
	        "/cart": {
	        	target:'http://127.0.0.1:3000',
	        	changeOrigin:true
	        },
	        "/order": {
	        	target:'http://127.0.0.1:3000',
	        	changeOrigin:true
	        },
	        "/shipping": {
	        	target:'http://127.0.0.1:3000',
	        	changeOrigin:true
	        },
	        "/payment": {
	        	target:'http://127.0.0.1:3000',
	        	changeOrigin:true
	        }
	    }
	}
};

