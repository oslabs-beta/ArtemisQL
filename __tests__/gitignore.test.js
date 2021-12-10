const fs = require('fs');
const path = require('path');

const gitignore = path.resolve(__dirname, '../.gitignore');

describe('Testing Git Ignore File', () => {
  const data = fs.readFileSync(gitignore, 'utf8');

  it('Check if .env is included.', () => {
    expect(data).toContain('.env');
  });

  it('Check if package-lock.json is included.', () => {
    expect(data).toContain('package-lock.json');
  });

  it('Check if build folder is included.', () => {
    expect(data).toContain('build');
  });

  it('Check if .DS_STORE is not included.', () => {
    expect(data).toContain('.DS_STORE');
  });
});