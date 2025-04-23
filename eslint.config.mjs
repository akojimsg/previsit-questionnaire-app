import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import pluginTs from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
    ],
  },
  {
    files: [
      'apps/**/*.ts',
      'apps/**/*.tsx',
      'packages/**/*.ts',
      'packages/**/*.tsx',
    ],
    plugins: {
      '@typescript-eslint': pluginTs,
      import: pluginImport,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.base.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.base.json'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-call': 'off',
      'import/no-unresolved': 'off',
      'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    },
  },
];
