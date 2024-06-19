module.exports = {
    verbose: true,
    preset: "jest-puppeteer",
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['expect-puppeteer'],
    
  };
