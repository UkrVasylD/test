/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  projects: [
    {
      displayName: 'unit',
      moduleFileExtensions: ['js'],
      roots: ['<rootDir>/'],
      testMatch: ['**.spec.js'],
      testPathIgnorePatterns: ['<rootDir>/tests'],
      setupFilesAfterEnv: ['jest-extended/all'],
    },
    {
      displayName: 'integration',
      moduleFileExtensions: ['js'],
      roots: ['<rootDir>/tests/integration'],
      testMatch: ['**.test.js'],
      globalSetup: '<rootDir>/tests/global-setup.js',
      globalTeardown: '<rootDir>/tests/global-teardown.js',
      globals: {
        SUPER_ADMIN: {
          TOKEN: '',
          EMAIL: 'admin@admin.com',
          PASSWORD: 'password',
          USER_NAME: 'AdminUserName',
        },
      },
      setupFilesAfterEnv: ['jest-extended/all'],
    },
    {
      displayName: 'component',
      moduleFileExtensions: ['js'],
      roots: ['<rootDir>/tests/components'],
      testMatch: ['**.test.js'],
      globalSetup: '<rootDir>/tests/global-setup.js',
      globalTeardown: '<rootDir>/tests/global-teardown.js',
      setupFilesAfterEnv: ['jest-extended/all'],
    },
  ],
};
