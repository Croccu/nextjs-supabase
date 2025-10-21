import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'app/**',
      'lib/**',
      'server/**',
      'api/**',
      '**/route.ts',       // explicitly skip Next.js routes
      '**/*.server.ts',    // skip Supabase server files
    ],
  },
})
