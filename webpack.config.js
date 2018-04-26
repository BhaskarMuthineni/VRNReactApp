var config = {
    mode: 'none',
    entry: './main.js',
    resolve: {
        extensions: ['.js', '.jsx',]
    },
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        historyApiFallback: true,//required when wanting to load application without any hashes like /detail/1
        contentBase: './',
        inline: true,
        host: '0.0.0.0',//required when running application with ip address
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                 test: /\.css$/,
                 loader: ['style-loader', 'css-loader']
            },
            {
                 test: /\.(svg|ttf|woff|woff2|eot)$/, 
                 loader: ['file-loader', 'url-loader']
            }
            // {
            //     test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            //     use: 'url-loader?limit=100000&mimetype=application/font-woff',
            // },
            // {
            //     test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            //     use: 'url-loader?limit=100000&mimetype=application/font-woff',
            // },
            // {
            //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            //     use: 'url-loader?limit=100000&mimetype=application/octet-stream',
            // },
            // {
            //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            //     use: 'file-loader',
            // },
            // {
            //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //     use: 'url-loader?limit=100000&mimetype=image/svg+xml',
            // },
        ]
    }

}

module.exports = config;