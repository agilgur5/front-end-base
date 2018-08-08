module.exports = {
  'presets': [
    ['@babel/preset-env', { useBuiltIns: 'usage' }],
    '@babel/preset-react',
    ['@babel/preset-stage-1', { decoratorsLegacy: true }]
  ],
  'plugins': [
    ['transform-imports', {
      // example usage below
      // potentially use for internal libs too, like `import {} from './fields'`
      'react-bootstrap': {
        'transform': 'react-bootstrap/lib/${member}',
        'preventFullImport': true
      }
    }]
  ]
}
