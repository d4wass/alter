import tseslint from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import rxjsPlugin from 'eslint-plugin-rxjs';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import globals from 'globals';

export default [
  {
    ignores: ['projects/**/*'],
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    globals: {
    ...globals.browser,
    ...globals.es2020,
    ...globals.node,
    ...globals.jest,
    AudioWorkletGlobalScope: 'readonly'
    }
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn'
    }
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      'rxjs': rxjsPlugin,
      '@angular-eslint': angularEslint
    },
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      ...angularEslint.configs['recommended'].rules,
      ...rxjsPlugin.configs['recommended'].rules,
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'rxjs/no-ignored-observable': 'error',
      'rxjs/no-subject-unsubscribe': 'error'
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularEslintTemplate
    },
    processor: '@angular-eslint/template/processor',
    rules: {
      ...angularEslintTemplate.configs['recommended'].rules,
      '@angular-eslint/template/no-negated-async': 'error'
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      jest: jestPlugin
    },
    rules: {
      ...jestPlugin.configs['recommended'].rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/valid-expect': 'error'
    }
  }
];
