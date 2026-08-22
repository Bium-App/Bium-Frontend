const {copyFileSync, mkdirSync} = require('node:fs');
const {join, resolve} = require('node:path');
const {spawnSync} = require('node:child_process');

const projectRoot = resolve(__dirname, '..');
const androidRoot = join(projectRoot, 'android');
const gradleCommand = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const apiBaseUrl =
  process.env.BLAZE_API_BASE_URL || 'http://13.124.250.181:8080';

const result = spawnSync(
  gradleCommand,
  ['assembleTeamTest', '--no-daemon'],
  {
    cwd: androidRoot,
    env: {
      ...process.env,
      BLAZE_API_ENV: 'aws',
      BLAZE_API_BASE_URL: apiBaseUrl,
    },
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
);

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

const source = join(
  androidRoot,
  'app',
  'build',
  'outputs',
  'apk',
  'teamTest',
  'app-teamTest.apk',
);
const distribution = join(projectRoot, 'distribution');
const destination = join(distribution, 'Bium-Android-TeamTest-v1.0.apk');

mkdirSync(distribution, {recursive: true});
copyFileSync(source, destination);
console.log(`\nTeam test APK: ${destination}`);
