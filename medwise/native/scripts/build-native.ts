import { execSync } from 'child_process';

try {
  execSync('node-gyp rebuild', {
    cwd: './native',
    stdio: 'inherit',
  });
  console.log('✅ Native addon built successfully');
} catch (err) {
  console.error('❌ Failed to build native addon:', err);
}