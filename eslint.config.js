import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([{
	extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

	plugins: {
		'@typescript-eslint': typescriptEslint,
	},

	files: [
		'eslint.config.js',
		'tests/**/*',
		'src/**/*'
	],

	languageOptions: {
		parser: tsParser,
		ecmaVersion: 5,
		sourceType: 'script',

		parserOptions: {
			project: ['./tsconfig.eslint.json'],
		},
	},

	rules: {
		'no-fallthrough': 'off',
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'linebreak-style': ['error', 'unix'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'spaced-comment': 'error',
		'arrow-parens': ['error', 'always'],
		'@/semi': 'error',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-this-alias': 'error',

		'@typescript-eslint/consistent-type-imports': ['error', {
			prefer: 'type-imports',
			fixStyle: 'separate-type-imports',
		}],

		'block-spacing': 'off',
		'@/block-spacing': 'error',
		'brace-style': 'off',
		'@/brace-style': ['error', '1tbs'],
		'func-call-spacing': 'off',
		'@/func-call-spacing': 'error',
		'object-curly-spacing': 'off',
		'@/object-curly-spacing': ['error', 'always'],
		'key-spacing': 'off',
		'@/key-spacing': 'error',
		'@/quotes': ['error', 'single'],
		'space-before-blocks': 'off',
		'@/space-before-blocks': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'comma-spacing': 'off',
		'@/comma-spacing': 'error',
		'require-await': 'off',
		'@typescript-eslint/require-await': 'error',

		// "@typescript-eslint/member-delimiter-style": ["error", {
		//     multiline: {
		//         delimiter: "semi",
		//         requireLast: true,
		//     },

		//     singleline: {
		//         delimiter: "semi",
		//         requireLast: true,
		//     },
		// }],
	},
}]);