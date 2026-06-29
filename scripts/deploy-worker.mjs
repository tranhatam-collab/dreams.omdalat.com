import { spawnSync } from 'node:child_process'

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const result = spawnSync(command, ['wrangler', 'deploy', ...process.argv.slice(2)], {
  env: { ...process.env, OPEN_NEXT_DEPLOY: 'true' },
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

if (result.error) {
  console.error(result.error)
}

process.exit(result.status ?? 1)
