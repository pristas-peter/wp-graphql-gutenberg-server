const puppeteer = require("./puppeteer");

module.exports = {
  ...puppeteer,
  formatError: ({ error }) => {
    return {
      error: {
        message: `${error}`,
        stack: error.stack,
      },
    };
  },
};
