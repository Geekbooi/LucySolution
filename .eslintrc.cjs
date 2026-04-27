module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      // React Three Fiber uses custom JSX props that are not HTML DOM attributes.
      // Disable the no-unknown-property rule for the R3F canvas component.
      files: ['src/components/LaptopScene.jsx', 'src/components/HeroScene.jsx'],
      rules: {
        'react/no-unknown-property': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
}
