const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const srcPath = subDir => path.join(__dirname, 'src', subDir);

module.exports = (_, env) => {
    const isProdMode = env.mode === 'production';
    const optimizationConfig = {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    };

    const cssHash = isProdMode ? '[hash:base64]' : '[path][name]__[local]--[hash:base64:5]';

    return {
        mode: isProdMode ? 'production' : 'development',
        entry: './src/index.tsx',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            inline: true,
            historyApiFallback: true,
            contentBase: './',
            hot: true,
        },
        optimization: isProdMode ? optimizationConfig : {},
        stats: {
            // suppress "export not found" warnings about re-exported types
            warningsFilter: /export .* was not found in/,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                '@/theme': path.resolve(__dirname, 'src/theme.ts'),
                '@/media': path.resolve(__dirname, 'src/media.ts'),
                '@/Routes': path.resolve(__dirname, 'src/Routes.ts'),
                '@/i18n': path.resolve(__dirname, 'src/i18n.js'),
                '@/components': srcPath('components'),
                '@/config': srcPath('config'),
                '@/hooks': srcPath('hooks'),
                '@/validations': srcPath('validations'),
                '@/graphql': srcPath('graphql'),
                '@/utils': srcPath('utils'),
                '@/constants': srcPath('constants'),
                '@/containers': srcPath('containers'),
                '@/context': srcPath('context'),
                '@/pages': srcPath('pages'),
                '@/enums': srcPath('enums'),
                '@/helpers': srcPath('helpers'),
                '@/services': srcPath('services'),
                '@/store': srcPath('store'),
                '@/styles': srcPath('styles'),
                '@/assets': srcPath('assets'),
                '@/types': srcPath('types'),
                '@/static': srcPath('static'),
                '@/generated': srcPath('generated'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|tsx|js|ts)$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            module: 'es2015',
                        },
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-modules-typescript-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    context: path.resolve(__dirname, 'src'),
                                    hashPrefix: cssHash,
                                },
                            },
                        },
                        { loader: 'sass-loader' },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
                },
                {
                    test: /\.(jpe?g|png|gif|mp3|svg$)$/i,
                    loader: 'file-loader',
                },
                {
                    test: /\.graphql$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },
            ],
        },
        plugins: [
            new MomentLocalesPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/static/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: 'bundle.css',
            }),
            new LodashModuleReplacementPlugin(),
        ],
        node: {
            fs: 'empty',
        },
    };
};
