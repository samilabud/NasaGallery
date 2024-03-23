const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
};

const getConfig = createJestConfig(config);

module.exports = async () => {
  const nextJestConfig = await getConfig();
  const transformIgnorePatterns = [
    "/node_modules/(?!@uidotdev|yet-another-react-lightbox)",
    ...nextJestConfig.transformIgnorePatterns.filter(
      (pattern) => pattern !== "/node_modules/"
    ),
  ];
  return {
    ...nextJestConfig,
    transformIgnorePatterns,
  };
};
