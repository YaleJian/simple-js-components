module.exports = {
    presets: [
        require.resolve('@docusaurus/core/lib/babel/preset'),
    ],
    plugins: ['@babel/@babel/plugin-syntax-dynamic-import']
};
