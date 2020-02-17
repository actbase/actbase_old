module.exports = api => {
  api.cache(true);
  return {
    presets: [['@babel/preset-env']],
    plugins: [
      [
        'babel-plugin-inline-import',
        { extensions: ['css'], refextends: ['native.js', '/native/'] },
      ],
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };
};
