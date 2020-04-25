const puppeteer = require("./puppeteer");

class ServerError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;
  }
}

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
  ServerError,
};
