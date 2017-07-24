//webpack.config.js
var webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {//注意这里是exports不是export
    entry: {
        app: ['babel-polyfill', __dirname + "/app/main.js"],
        vendor: ['react', 'react-dom', 'react-router-dom',
            'react-router', 'history', 'react-redux', 'redux', 'redux-thunk'] //提取react模块作为公共的js文件
    },//唯一入口文件
    output: {//输出目录
        path: __dirname + "/build",//打包后的js文件存放的地方
        publicPath: '/',
        filename: '[name].js', //注意这里，用[name]可以自动生成路由名称对应的js文件
        chunkFilename: '[name].js' //注意这里，用[name]可以自动生成路由名称对应的js文件
    },

    module: {
        //loaders加载器
        loaders: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader'//loader的名称（必须）
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({ //<--key to reduce React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'vendor.js'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
    }
};
