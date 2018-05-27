module.exports = {
  'presets': [
    ['@babel/preset-env', { useBuiltIns: 'entry' }],
    '@babel/preset-react',
    ['@babel/preset-stage-1', { decoratorsLegacy: true }]
  ]
}
