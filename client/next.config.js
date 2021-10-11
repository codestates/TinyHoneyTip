const Dotenv = require('dotenv-webpack');

module.exports = {
    images: {
        domains: [
            'cdn.discordapp.com',
            'thtimg.s3.ap-northeast-2.amazonaws.com',
            'openweathermap.org',
            'ggultip.com',
            'k.kakaocdn.net',
        ],
    },
    reactStrictMode: true,
    node: {
        fs: 'empty',
    },
    future: { webpack5: false },
    webpack: (config) => {
        config.plugins.push(new Dotenv({ silent: true }));

        return config;
    },
};
