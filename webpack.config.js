var config = {
    mode: 'none',
    entry: './app/main.js',
    resolve: {
        extensions: ['.js', '.jsx',]
    },
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
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
        ]
    }

}

module.exports = config;