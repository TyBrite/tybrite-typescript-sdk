#!/usr/bin/env node
/**
 * Standalone version management script
 * Can be run independently or integrated into other scripts
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function updateVersion() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const currentVersion = packageJson.version;
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  console.log(`\n📦 Current version: ${currentVersion}`);
  console.log('\n🔢 Version update options:');
  console.log('  1. Press ENTER to auto-increment patch version (X.Y.Z+1)');
  console.log('  2. Enter major version (e.g., "2" for 2.0.0)');
  console.log('  3. Enter major.minor (e.g., "1.5" for 1.5.0)');
  console.log('  4. Enter full version (e.g., "1.2.3")');
  console.log('  5. Type "skip" to keep current version\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter version (or press ENTER for auto-increment): ', (answer) => {
      rl.close();
      
      const input = answer.trim();
      let newVersion;

      if (!input || input === '') {
        // Auto-increment patch
        newVersion = `${major}.${minor}.${patch + 1}`;
      } else if (input.toLowerCase() === 'skip') {
        console.log(`⏭️  Keeping version ${currentVersion}\n`);
        resolve(currentVersion);
        return;
      } else if (/^\d+$/.test(input)) {
        // Major version only (e.g., "2")
        const newMajor = parseInt(input);
        newVersion = `${newMajor}.0.0`;
      } else if (/^\d+\.\d+$/.test(input)) {
        // Major.minor (e.g., "1.5")
        const [newMajor, newMinor] = input.split('.').map(Number);
        newVersion = `${newMajor}.${newMinor}.0`;
      } else if (/^\d+\.\d+\.\d+$/.test(input)) {
        // Full version (e.g., "1.2.3")
        newVersion = input;
      } else {
        console.log('❌ Invalid version format. Keeping current version.\n');
        resolve(currentVersion);
        return;
      }

      // Update package.json
      packageJson.version = newVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
      console.log(`✅ Version updated: ${currentVersion} → ${newVersion}\n`);
      resolve(newVersion);
    });
  });
}

// Run if called directly
if (require.main === module) {
  updateVersion()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

module.exports = { updateVersion };
