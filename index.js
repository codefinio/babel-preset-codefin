var assign = require('object.assign')

var transformModule = [require('@babel/plugin-transform-modules-commonjs').default, {
  strict: false
}]

var defaultTargets = {
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
      [require('@babel/preset-es2015').default],
      [require('@babel/preset-es2016').default],
      [require('@babel/preset-es2017').default],
      [require('@babel/preset-env').default,{
        debug: debug,
        modules: false,
        targets: transpileTargets
      }],
      [require('@babel/preset-stage-0').default,{
        "decoratorsLegacy": true
      }]
    ],
    plugins: [
      options && options.modules === false ? null : transformModule
    ].filter(Boolean)
  }
}