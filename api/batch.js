const puppeteer = require("puppeteer");

const { batch } = require("../src");
const { wrapHandler } = require("./_utils");

const launch = puppeteer.launch({ headless: true });

module.exports = wrapHandler(async (req) =>
  batch({ ...req.body, browser: await launch })
);
