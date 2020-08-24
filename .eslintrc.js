module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/jsx-filename-extension': [1, { extension: ['.ts', '.tsx'] }],
		'prettier/prettier': ["error"]
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
};
