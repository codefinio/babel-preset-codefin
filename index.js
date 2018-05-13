var assign = require('object.assign')

var transformModule = [require('@babel/plugin-transform-modules-commonjs'), {
  strict: false
}]

var defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  explorer: 9,
  firefox: 52,
  safari: 8,
  ucandroid: 1,
  node: 6
}

function buildTargets(options) {
  return assign({}, defaultTargets, options.additionalTargets);
}

module.exports = function buildCodefinPreset(context, options) {
  var transpileTargets = (options && options.targets) ||
    buildTargets(options || {});
  
  var debug = (options && typeof options.debug === 'boolean') ? !!options.debug : false;
  
  return {
    presets: [
      require('@babel/preset-es2015'),
      require('@babel/preset-es2016'),
      require('@babel/preset-es2017'),
      require('@babel/preset-env').default(null, {
        debug: debug,
        modules: false,
        targets: transpileTargets
      })
    ],
    plugins: [
      options && options.modules === false ? null : transformModule,
      [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
      [require("@babel/plugin-proposal-class-properties"), { "loose" : true }],
      [require("@babel/plugin-proposal-optional-chaining")],
      [require("@babel/plugin-proposal-pipeline-operator")]
    ].filter(Boolean)
  }
}