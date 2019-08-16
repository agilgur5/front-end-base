module.exports = {
  'presets': [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    '@babel/preset-react'
  ],
  'plugins': [
    // proposals
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    // transforms
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
