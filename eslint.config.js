import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin from 'eslint-plugin-sonarjs';

import localFilenamesPlugin from './eslint-plugins/local-filenames-plugin.js';

/**
 * ESLint 9 — flat config (ESM).
 *
 * Orden de los objetos en el array:
 * 1. ignores          — exclusiones globales (no se analizan).
 * 2. Base             — parser TS/TSX, plugins y reglas comunes (solo *.{ts,tsx}).
 * 3. Overrides        — convenciones por carpeta (nombres de archivo / naming).
 *
 * Convenciones de archivo (plugins en eslint-plugins/):
 * - components/**     → PascalCase + excepción index
 * - hooks/**          → camelCase + excepción index
 * - adapters/**       → kebab-case + .adapter.ts
 * - interceptors/**   → kebab-case + .interceptor.ts
 * - services/**       → kebab-case + .service.ts (se ignora services/interceptors/**)
 * - interfaces/**     → kebab-case + .interface.ts
 *
 * Nota: eslint-plugin-boundaries está cargado; las reglas de arquitectura se pueden
 * activar cuando definan carpeta/límites en el proyecto.
 *
 * Sonquality / complejidad: eslint-plugin-sonarjs (preset recommended), solo TS/TSX.
 * settings.react se fuerza a "detect" para no usar el placeholder del preset Sonar.
 */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/build/**',
      '**/*.{test,spec}.{ts,tsx}',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      boundaries: boundariesPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'boundaries/elements': [
        { type: 'features', pattern: 'src/features/*' },
        { type: 'domain', pattern: 'src/domain/*' },
        { type: 'infrastructure', pattern: 'src/infrastructure/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      // ---- React (Vite / TS: no hace falta React en scope; sin PropTypes) ----
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // ---- React Hooks ----
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ---- Imports: builtin → external → internal, alfabético, línea entre grupos ----
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      // ---- TypeScript ----
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          format: ['PascalCase', 'UPPER_CASE', 'camelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'function',
          modifiers: ['exported'],
          format: ['PascalCase'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // ---- Prettier vía ESLint ----
      'prettier/prettier': 'error',

      // ---- Consola: permitir error/warn (p. ej. boundaries, debugging controlado) ----
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...sonarjsPlugin.configs.recommended,
    settings: {
      ...sonarjsPlugin.configs.recommended.settings,
      react: {
        version: 'detect',
      },
    },
  },

  // --- Overrides: nombres de archivo por carpeta ---

  {
    files: ['**/components/**/*.{ts,tsx}'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/components-filename-pascal-case': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          modifiers: ['exported'],
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
      ],
    },
  },
  {
    files: ['**/hooks/**/*.{ts,tsx}'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/hooks-filename-camel-case': 'error',
    },
  },
  {
    files: ['**/adapters/**/*.ts'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/adapters-filename': 'error',
    },
  },
  {
    files: ['**/interceptors/**/*.ts'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/interceptors-filename': 'error',
    },
  },
  {
    files: ['**/services/**/*.ts'],
    ignores: ['**/services/interceptors/**'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/services-filename': 'error',
    },
  },
  {
    files: ['**/interfaces/**/*.ts'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/interfaces-filename': 'error',
    },
  },
  {
    files: ['**/constants/**/*.ts'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/constants-filename': 'error',
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    ignores: ['**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      'local-filenames': localFilenamesPlugin,
    },
    rules: {
      'local-filenames/pages-dir-pascal-case': 'error',
    },
  },
];
