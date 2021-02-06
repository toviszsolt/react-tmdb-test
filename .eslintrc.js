module.exports = {
  extends: ['react-app', 'airbnb', 'airbnb/hooks'],
  plugins: ['react'],
  rules: {
    'linebreak-style': ['error', process.env.NODE_ENV === 'prod' ? 'unix' : 'windows'],
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'space-in-parens': 'off',
    'click-events-have-key-events': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'arrow-body-style': 'off',
  },
};
