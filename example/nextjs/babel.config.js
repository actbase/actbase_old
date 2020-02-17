module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: 'last 1 version, > 1%, not dead, not IE 11',
          modules: false,
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-root-import',
      {},
      // {
      //   paths: [
      //     {
      //       rootPathSuffix: './actbase',
      //       rootPathPrefix: 'actbase',
      //     }
      //   ],
      // },
    ],
  ],
};
