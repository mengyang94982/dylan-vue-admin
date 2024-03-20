import { defineConfig } from '@dylanjs/eslint-config'

export default defineConfig(
  {
    vue: true
  },
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', '[id]']
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          ignores: ['/^icon-/']
        }
      ],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ],
      'vue/no-static-inline-styles': 'off',
      'vue/html-quotes': ['error', 'double'],
      'max-params': 'off'
    }
  }
)
