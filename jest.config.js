module.exports = {
    projects: [
        {
            displayName: 'client',
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/client/src/**/__tests__/**/*.js'],
            setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        },
        {
            displayName: 'server',
            testEnvironment: 'node',
            testMatch: ['<rootDir>/server/**/__tests__/**/*.js'],
            setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        },
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    }
};