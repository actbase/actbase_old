module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-object-rest-spread',
      ['babel-plugin-inline-import', { extensions: ['css'], refextends: ['native.js', '/native/'] }],
    ],
  };
};
