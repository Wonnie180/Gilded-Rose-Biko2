module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/blueprint-templates/"],
  collectCoverageFrom: ["app/gilded-rose.ts"],
  collectCoverage: true,
  testMatch: ["**/.tests/**/*.test.[jt]s?(x)"],
};
