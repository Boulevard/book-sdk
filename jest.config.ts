export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.ts", "<rootDir>config.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
      compiler: "ttypescript"
    }
  },
  transform: {
    ".(ts|tsx)": "ts-jest"
  }
};
