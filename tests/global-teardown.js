const { execSync } = require('child_process');

module.exports = async () => {
  execSync('docker compose down -v ', {
    stdio: 'inherit',
    cwd: __dirname,
  });
};
