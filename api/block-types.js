const puppeteer = require("puppeteer");

const { blockTypes } = require("../src");
const { wrapHandler } = require("./_utils");

const launch = puppeteer.launch({ headless: true });

module.exports = wrapHandler(async (req) =>
  blockTypes({ ...req.body, browser: await launch })
);
