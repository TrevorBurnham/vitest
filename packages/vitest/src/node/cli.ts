import { createCLI } from './cli/cac'

console.error('[DEBUG] vitest CLI starting, argv:', process.argv)
console.error('[DEBUG] NODE_ENV:', process.env.NODE_ENV)
console.error('[DEBUG] CI:', process.env.CI)

// Add exit handlers to debug unexpected exits
process.on('exit', (code) => {
  console.error('[DEBUG] Process exiting with code:', code)
  console.error('[DEBUG] Stack trace:', new Error().stack)
})

process.on('beforeExit', (code) => {
  console.error('[DEBUG] Process beforeExit event, code:', code)
})

try {
  createCLI().parse()
  console.error('[DEBUG] vitest CLI parse completed')
} catch (error) {
  console.error('[DEBUG] vitest CLI error:', error)
  process.exit(1)
}
