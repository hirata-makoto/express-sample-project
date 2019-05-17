let devtool
if(process.env.NODE_ENV === 'production'){
    devtool = ''
}else{
    devtool = 'inline-source-map'
}
const path = require('path')
module.exports = {
    entry: './client/index.js',
    output: {
        filename: '../public/js/bundle.js'
    },
    //target: 'node',
    module: {
        rules: [{
            test: /.js$/,
            loader: 'babel-loader',
            options: {
                presets:[
                    ['@babel/preset-env',{
                        targets: {
                            'browsers': [
                                '>1.00%',
                                'not ie 11',
                                'not op_mini all'
                            ]
                        }
                    }],
                    '@babel/react'
                ],
                plugins:[
                    '@babel/plugin-proposal-class-properties'
                ],
            },
        }]
    },
    devtool: devtool,
    resolve:{
        alias:{
            '@': path.resolve(__dirname, 'client')
        }
    },
    node: {
        console: true,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    performance: { hints: false }
}
