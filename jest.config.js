module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  }
};
