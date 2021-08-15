const config = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};

module.exports = config;
